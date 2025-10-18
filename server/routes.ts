import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { generateVirtualTryOn } from "./gemini";
import { generateTrainingPlan } from "./trainingGenerator";
import { 
  insertUserProfileSchema, 
  insertTrainingPlanSchema,
  insertTryOnResultSchema 
} from "@shared/schema";
import { suggestedLooks } from "@shared/mockData";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserProfileSchema.parse(req.body);
      const user = await storage.createUserProfile(validatedData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUserProfile(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/upload-photo", upload.single("photo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No photo uploaded" });
      }
      
      const base64Image = req.file.buffer.toString("base64");
      const photoUrl = `data:${req.file.mimetype};base64,${base64Image}`;
      
      res.json({ photoUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/training-plans", async (req, res) => {
    try {
      const { userId, weekdays, startTime, duration, fitnessGoal } = req.body;
      
      const workouts = generateTrainingPlan(weekdays, startTime, duration, fitnessGoal);
      
      const planData = {
        userId,
        weekdays,
        startTime,
        duration,
        workouts,
      };
      
      const validatedData = insertTrainingPlanSchema.parse(planData);
      const plan = await storage.createTrainingPlan(validatedData);
      
      res.json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/training-plans/user/:userId", async (req, res) => {
    try {
      const plan = await storage.getTrainingPlanByUserId(req.params.userId);
      if (!plan) {
        return res.status(404).json({ error: "Training plan not found" });
      }
      res.json(plan);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/virtual-tryon", async (req, res) => {
    try {
      const { userId, lookId, userPhotoBase64 } = req.body;
      
      if (!userPhotoBase64) {
        return res.status(400).json({ error: "User photo is required" });
      }

      const look = suggestedLooks.find(l => l.id === lookId);
      if (!look) {
        return res.status(404).json({ error: "Look not found" });
      }

      const outfitDescription = `${look.shoes.name}, ${look.clothes.name}, ${look.accessories.name}`;
      
      const imageBase64 = await generateVirtualTryOn(
        userPhotoBase64,
        outfitDescription,
        look.name
      );
      
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      
      const tryOnResult = await storage.createTryOnResult({
        userId,
        lookId: look.id,
        lookName: look.name,
        imageUrl,
      });
      
      res.json(tryOnResult);
    } catch (error: any) {
      console.error("Virtual try-on error:", error);
      res.status(500).json({ error: error.message || "Failed to generate virtual try-on" });
    }
  });

  app.post("/api/virtual-tryon/batch", async (req, res) => {
    try {
      const { userId, userPhotoBase64 } = req.body;
      
      if (!userPhotoBase64) {
        return res.status(400).json({ error: "User photo is required" });
      }

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const results = [];
      
      for (const look of suggestedLooks) {
        try {
          const outfitDescription = `${look.shoes.name}, ${look.clothes.name}, ${look.accessories.name}`;
          
          const imageBase64 = await generateVirtualTryOn(
            userPhotoBase64,
            outfitDescription,
            look.name
          );
          
          const imageUrl = `data:image/png;base64,${imageBase64}`;
          
          const tryOnResult = await storage.createTryOnResult({
            userId,
            lookId: look.id,
            lookName: look.name,
            imageUrl,
          });
          
          results.push(tryOnResult);
        } catch (error) {
          console.error(`Error generating try-on for ${look.name}:`, error);
        }
      }
      
      if (results.length === 0) {
        return res.status(500).json({ error: "Failed to generate any virtual try-on images" });
      }
      
      res.json(results);
    } catch (error: any) {
      console.error("Batch virtual try-on error:", error);
      res.status(500).json({ error: error.message || "Failed to generate virtual try-ons" });
    }
  });

  app.get("/api/try-on-results/user/:userId", async (req, res) => {
    try {
      const results = await storage.getTryOnResultsByUserId(req.params.userId);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

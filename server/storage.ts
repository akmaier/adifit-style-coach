import { 
  type UserProfile, 
  type InsertUserProfile,
  type TrainingPlan,
  type InsertTrainingPlan,
  type TryOnResult,
  type InsertTryOnResult
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(id: string): Promise<UserProfile | undefined>;
  
  createTrainingPlan(plan: InsertTrainingPlan): Promise<TrainingPlan>;
  getTrainingPlanByUserId(userId: string): Promise<TrainingPlan | undefined>;
  
  createTryOnResult(result: InsertTryOnResult): Promise<TryOnResult>;
  getTryOnResultsByUserId(userId: string): Promise<TryOnResult[]>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<string, UserProfile>;
  private trainingPlans: Map<string, TrainingPlan>;
  private tryOnResults: Map<string, TryOnResult>;

  constructor() {
    this.userProfiles = new Map();
    this.trainingPlans = new Map();
    this.tryOnResults = new Map();
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const profile: UserProfile = { 
      ...insertProfile,
      photoUrl: insertProfile.photoUrl ?? null,
      id,
      createdAt: new Date()
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async createTrainingPlan(insertPlan: InsertTrainingPlan): Promise<TrainingPlan> {
    const id = randomUUID();
    const plan: TrainingPlan = {
      ...insertPlan,
      weekdays: insertPlan.weekdays as any,
      workouts: insertPlan.workouts as any,
      id,
      createdAt: new Date()
    };
    this.trainingPlans.set(id, plan);
    return plan;
  }

  async getTrainingPlanByUserId(userId: string): Promise<TrainingPlan | undefined> {
    return Array.from(this.trainingPlans.values()).find(
      (plan) => plan.userId === userId
    );
  }

  async createTryOnResult(insertResult: InsertTryOnResult): Promise<TryOnResult> {
    const id = randomUUID();
    const result: TryOnResult = {
      ...insertResult,
      id,
      createdAt: new Date()
    };
    this.tryOnResults.set(id, result);
    return result;
  }

  async getTryOnResultsByUserId(userId: string): Promise<TryOnResult[]> {
    return Array.from(this.tryOnResults.values()).filter(
      (result) => result.userId === userId
    );
  }
}

export const storage = new MemStorage();

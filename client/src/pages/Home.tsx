import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import UserForm, { type UserFormData } from '@/components/UserForm';
import SuggestedLooks from '@/components/SuggestedLooks';
import VirtualTryOn from '@/components/VirtualTryOn';
import TrainingPlan from '@/components/TrainingPlan';
import ShareCard from '@/components/ShareCard';
import { type SuggestedLook } from '@shared/mockData';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@shared/schema';

type Step = 'hero' | 'form' | 'looks' | 'tryon' | 'plan';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [tryOnResults, setTryOnResults] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      let photoUrl = '';
      
      if (data.photo) {
        const photoResponse = await api.uploadPhoto(data.photo);
        photoUrl = photoResponse.photoUrl;
      }
      
      const profile = await api.createUser({
        name: data.name,
        age: parseInt(data.age),
        gender: data.gender,
        fitnessGoal: data.fitnessGoal,
        location: data.location,
        photoUrl,
      });
      
      setUserProfile(profile);
      setUserData(data);
      setCurrentStep('looks');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save your profile',
        variant: 'destructive',
      });
    }
  };

  const handleTryOn = async (look: SuggestedLook) => {
    if (!userProfile || !userData?.photo) {
      toast({
        title: 'Photo Required',
        description: 'Please upload your photo to use virtual try-on',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStep('tryon');
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        
        try {
          const results = await api.generateVirtualTryOns({
            userId: userProfile.id,
            userPhotoBase64: base64Data,
          });
          
          setTryOnResults(results);
          setIsGenerating(false);
          
          const trainingPlan = await api.createTrainingPlan({
            userId: userProfile.id,
            weekdays: userData.weekdays,
            startTime: userData.startTime,
            duration: parseInt(userData.duration),
            fitnessGoal: userData.fitnessGoal,
          });
          
          setTimeout(() => {
            setCurrentStep('plan');
          }, 2000);
        } catch (error: any) {
          setIsGenerating(false);
          toast({
            title: 'Try-On Failed',
            description: error.message || 'Failed to generate virtual try-on images',
            variant: 'destructive',
          });
        }
      };
      
      reader.readAsDataURL(userData.photo);
    } catch (error: any) {
      setIsGenerating(false);
      toast({
        title: 'Error',
        description: 'Failed to process your photo',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userName={userData?.name} />
      
      <main>
        {currentStep === 'hero' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}

        {currentStep === 'form' && (
          <UserForm onSubmit={handleFormSubmit} />
        )}

        {currentStep === 'looks' && (
          <SuggestedLooks onTryOn={handleTryOn} />
        )}

        {currentStep === 'tryon' && (
          <VirtualTryOn results={tryOnResults} isLoading={isGenerating} />
        )}

        {currentStep === 'plan' && userData && tryOnResults.length > 0 && (
          <>
            <TrainingPlan 
              weekdays={userData.weekdays}
              startTime={userData.startTime}
              duration={parseInt(userData.duration)}
            />
            
            <div className="border-t border-border my-16" />
            
            {tryOnResults[0] && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Share Your Style</h2>
                <ShareCard 
                  userName={userData.name}
                  lookName={tryOnResults[0].lookName}
                  tryOnImageUrl={tryOnResults[0].imageUrl}
                  trainingDays={userData.weekdays}
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Adifit Style Coach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

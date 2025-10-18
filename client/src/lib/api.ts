import type { UserProfile, TrainingPlan, TryOnResult } from '@shared/schema';

export interface CreateUserData {
  name: string;
  age: number;
  gender: string;
  fitnessGoal: string;
  location: string;
  photoUrl?: string;
}

export interface CreateTrainingPlanData {
  userId: string;
  weekdays: string[];
  startTime: string;
  duration: number;
  fitnessGoal: string;
}

export interface VirtualTryOnRequest {
  userId: string;
  userPhotoBase64: string;
}

async function fetchAPI(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  return response;
}

export const api = {
  async createUser(data: CreateUserData): Promise<UserProfile> {
    const response = await fetchAPI('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async uploadPhoto(file: File): Promise<{ photoUrl: string }> {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await fetchAPI('/api/upload-photo', {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  async createTrainingPlan(data: CreateTrainingPlanData): Promise<TrainingPlan> {
    const response = await fetchAPI('/api/training-plans', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async generateVirtualTryOns(data: VirtualTryOnRequest): Promise<TryOnResult[]> {
    const response = await fetchAPI('/api/virtual-tryon/batch', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};

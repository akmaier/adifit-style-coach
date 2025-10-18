import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';

export interface UserFormData {
  name: string;
  age: string;
  gender: string;
  fitnessGoal: string;
  location: string;
  weekdays: string[];
  startTime: string;
  duration: string;
  photo?: File;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
}

const weekdayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    age: '',
    gender: '',
    fitnessGoal: '',
    location: '',
    weekdays: [],
    startTime: '',
    duration: '',
  });
  const [photoName, setPhotoName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSubmit(formData);
  };

  const toggleWeekday = (day: string) => {
    setFormData(prev => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter(d => d !== day)
        : [...prev.weekdays, day]
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-2" data-testid="text-form-title">Tell Us About Yourself</h2>
      <p className="text-muted-foreground mb-8" data-testid="text-form-subtitle">
        Help us create your perfect athletic style and training plan
      </p>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                required
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Your age"
                required
                data-testid="input-age"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={value => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger id="gender" data-testid="select-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fitnessGoal">Fitness Goal</Label>
            <Select value={formData.fitnessGoal} onValueChange={value => setFormData(prev => ({ ...prev, fitnessGoal: value }))}>
              <SelectTrigger id="fitnessGoal" data-testid="select-fitness-goal">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="endurance">Build Endurance</SelectItem>
                <SelectItem value="general-fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, Country"
              required
              data-testid="input-location"
            />
          </div>

          <div className="space-y-3">
            <Label>Preferred Training Days</Label>
            <div className="flex flex-wrap gap-3">
              {weekdayOptions.map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={formData.weekdays.includes(day)}
                    onCheckedChange={() => toggleWeekday(day)}
                    data-testid={`checkbox-${day.toLowerCase()}`}
                  />
                  <Label htmlFor={day} className="cursor-pointer">{day}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime">Preferred Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
                data-testid="input-start-time"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Session Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={value => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger id="duration" data-testid="select-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Upload Your Photo (for AI Try-On)</Label>
            <div className="relative">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                data-testid="input-photo"
              />
              <label
                htmlFor="photo"
                className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover-elevate active-elevate-2 transition-all"
                data-testid="label-photo-upload"
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {photoName || 'Click to upload your photo'}
                </span>
              </label>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" data-testid="button-submit-form">
            Continue to Outfit Selection
          </Button>
        </form>
      </Card>
    </div>
  );
}

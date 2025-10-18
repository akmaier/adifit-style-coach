import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, Dumbbell } from 'lucide-react';
import { useState } from 'react';

interface WorkoutDay {
  day: string;
  time: string;
  duration: number;
  type: string;
  description: string;
  completed: boolean;
}

interface TrainingPlanProps {
  weekdays: string[];
  startTime: string;
  duration: number;
}

const workoutTypes = [
  { type: 'Cardio', color: 'bg-chart-1' },
  { type: 'Strength', color: 'bg-chart-2' },
  { type: 'HIIT', color: 'bg-chart-3' },
  { type: 'Recovery', color: 'bg-chart-4' },
];

export default function TrainingPlan({ weekdays, startTime, duration }: TrainingPlanProps) {
  const [workouts, setWorkouts] = useState<WorkoutDay[]>(
    weekdays.map((day, index) => ({
      day,
      time: startTime,
      duration,
      type: workoutTypes[index % workoutTypes.length].type,
      description: `${workoutTypes[index % workoutTypes.length].type} training session`,
      completed: false,
    }))
  );

  const toggleCompleted = (index: number) => {
    setWorkouts(prev => prev.map((workout, i) => 
      i === index ? { ...workout, completed: !workout.completed } : workout
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-3" data-testid="text-training-plan-title">
        Your Personalized Training Plan
      </h2>
      <p className="text-muted-foreground mb-12" data-testid="text-training-plan-subtitle">
        Weekly schedule tailored to your goals and preferences
      </p>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="mb-8" data-testid="tabs-training-view">
          <TabsTrigger value="quick" data-testid="tab-quick-view">Quick View</TabsTrigger>
          <TabsTrigger value="detailed" data-testid="tab-detailed-view">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workouts.map((workout, index) => {
              const workoutColor = workoutTypes.find(w => w.type === workout.type)?.color || 'bg-primary';
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden ${workout.completed ? 'opacity-60' : ''}`}
                  data-testid={`card-workout-quick-${index}`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${workoutColor}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg" data-testid={`text-workout-day-${index}`}>
                        {workout.day}
                      </CardTitle>
                      <Badge variant="secondary" data-testid={`badge-workout-type-${index}`}>
                        {workout.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span data-testid={`text-workout-time-${index}`}>{workout.time} • {workout.duration} min</span>
                    </div>
                    <Button 
                      variant={workout.completed ? "secondary" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => toggleCompleted(index)}
                      data-testid={`button-mark-done-${index}`}
                    >
                      <CheckCircle2 className={`mr-2 h-4 w-4 ${workout.completed ? 'text-chart-2' : ''}`} />
                      {workout.completed ? 'Completed' : 'Mark Done'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {workouts.map((workout, index) => (
                      <tr key={index} className={workout.completed ? 'opacity-60' : ''} data-testid={`row-workout-detailed-${index}`}>
                        <td className="px-6 py-4 font-medium" data-testid={`cell-day-${index}`}>{workout.day}</td>
                        <td className="px-6 py-4 text-muted-foreground" data-testid={`cell-time-${index}`}>{workout.time}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" data-testid={`cell-type-${index}`}>{workout.type}</Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground" data-testid={`cell-duration-${index}`}>{workout.duration} min</td>
                        <td className="px-6 py-4 text-muted-foreground" data-testid={`cell-description-${index}`}>{workout.description}</td>
                        <td className="px-6 py-4">
                          <Button 
                            variant={workout.completed ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => toggleCompleted(index)}
                            data-testid={`button-detailed-mark-done-${index}`}
                          >
                            {workout.completed ? <CheckCircle2 className="h-4 w-4 text-chart-2" /> : 'Mark Done'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex gap-4 justify-center">
        <Button variant="outline" data-testid="button-export-calendar">
          <Dumbbell className="mr-2 h-4 w-4" />
          Export to Calendar
        </Button>
      </div>
    </div>
  );
}

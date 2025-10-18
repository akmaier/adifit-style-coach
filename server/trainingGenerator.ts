interface WorkoutDay {
  day: string;
  time: string;
  duration: number;
  type: string;
  description: string;
  completed: boolean;
}

const workoutTypes = [
  { type: 'Cardio', description: 'High-intensity cardio training', focus: 'endurance' },
  { type: 'Strength', description: 'Resistance and strength building', focus: 'muscle-gain' },
  { type: 'HIIT', description: 'High-intensity interval training', focus: 'weight-loss' },
  { type: 'Recovery', description: 'Active recovery and stretching', focus: 'general-fitness' },
  { type: 'Core', description: 'Core strength and stability', focus: 'general-fitness' },
  { type: 'Endurance', description: 'Long-distance cardio building', focus: 'endurance' },
];

export function generateTrainingPlan(
  weekdays: string[],
  startTime: string,
  duration: number,
  fitnessGoal: string
): WorkoutDay[] {
  const priorityWorkouts = workoutTypes.filter(w => w.focus === fitnessGoal);
  const otherWorkouts = workoutTypes.filter(w => w.focus !== fitnessGoal);
  
  const allWorkouts = [...priorityWorkouts, ...otherWorkouts];
  
  return weekdays.map((day, index) => {
    const workoutType = allWorkouts[index % allWorkouts.length];
    
    return {
      day,
      time: startTime,
      duration,
      type: workoutType.type,
      description: workoutType.description,
      completed: false,
    };
  });
}

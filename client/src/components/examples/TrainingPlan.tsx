import TrainingPlan from '../TrainingPlan';

export default function TrainingPlanExample() {
  return (
    <TrainingPlan 
      weekdays={['Mon', 'Wed', 'Fri', 'Sat']}
      startTime="07:00"
      duration={45}
    />
  );
}

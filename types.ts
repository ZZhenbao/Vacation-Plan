
export interface Activity {
  time: string;
  description: string;
  type: 'Dining' | 'Activity' | 'Sightseeing' | 'Travel' | 'Accommodation';
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Itinerary {
  tripTitle: string;
  destination: string;
  duration: number;
  itinerary: DayPlan[];
}

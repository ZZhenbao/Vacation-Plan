import React from 'react';
import type { Itinerary, Activity } from '../types';

const ActivityIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  // Fix for: Cannot find namespace 'JSX'. Using React.ReactElement explicitly from the imported React module.
  const iconMap: Record<Activity['type'], React.ReactElement> = {
    'Dining': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, // Using a clock for dining
    'Activity': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    'Sightseeing': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
    'Travel': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />, // using a chat bubble for info/travel
    'Accommodation': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  };
  
  // A generic fallback icon
  const fallbackIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />;

  return (
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {iconMap[type] || fallbackIcon}
    </svg>
  );
};


const ItineraryDisplay: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">{itinerary.tripTitle}</h2>
        <p className="mt-2 text-xl text-gray-500">{itinerary.destination} - {itinerary.duration} Days of Adventure</p>
      </div>
      
      <div className="space-y-12">
        {itinerary.itinerary.map((day) => (
          <div key={day.day} className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 md:w-1/4">
              <div className="sticky top-24">
                <h3 className="text-sm font-bold uppercase text-blue-600 tracking-wider">Day {day.day}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{day.title}</p>
              </div>
            </div>
            <div className="flex-grow md:w-3/4 md:border-l-2 border-gray-200 md:pl-8">
                <div className="space-y-8">
                    {day.activities.map((activity, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <ActivityIcon type={activity.type} />
                                {index !== day.activities.length - 1 && (
                                    <div className="w-px h-full bg-gray-200 my-2"></div>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-gray-500">{activity.time}</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
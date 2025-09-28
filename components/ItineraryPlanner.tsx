
import React, { useState, useCallback } from 'react';
import { generateItinerary, generateDestinationImage } from '../services/geminiService';
import type { Itinerary } from '../types';
import ItineraryDisplay from './ItineraryDisplay';
import ImageDisplay from './ImageDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

const ItineraryPlanner: React.FC = () => {
  const [destination, setDestination] = useState<string>('Tokyo, Japan');
  const [duration, setDuration] = useState<string>('5');
  const [interests, setInterests] = useState<string>('culture, food, and technology');
  
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ itinerary: boolean; image: boolean }>({ itinerary: false, image: false });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !duration || !interests) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading({ itinerary: true, image: true });
    setItinerary(null);
    setImageUrl(null);
    setError(null);

    try {
      const itineraryPromise = generateItinerary(destination, duration, interests);
      const imagePromise = itineraryPromise.then(itineraryResult => {
         // Start image generation only after getting itinerary to use its title
         setLoading(prev => ({ ...prev, itinerary: false }));
         return generateDestinationImage(destination, itineraryResult.tripTitle);
      });

      const [itineraryResult, imageUrlResult] = await Promise.all([itineraryPromise, imagePromise]);
      
      setItinerary(itineraryResult);
      setImageUrl(imageUrlResult);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading({ itinerary: false, image: false });
    }
  }, [destination, duration, interests]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Plan Your Dream Vacation</h2>
        <p className="text-gray-600 mb-6">Tell us about your trip, and our AI will craft the perfect itinerary for you.</p>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="flex flex-col">
            <label htmlFor="destination" className="mb-2 font-semibold text-gray-700">Destination</label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, France"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="mb-2 font-semibold text-gray-700">Duration (days)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 7"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="interests" className="mb-2 font-semibold text-gray-700">Interests</label>
            <input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., art, history, hiking"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading.itinerary || loading.image}
            className="md:col-span-3 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading.itinerary || loading.image ? 'Crafting Your Adventure...' : 'Generate Itinerary'}
          </button>
        </form>
      </div>

      {error && <ErrorDisplay message={error} />}

      {(loading.itinerary || loading.image || itinerary || imageUrl) && (
        <div className="mt-12 space-y-12">
          <ImageDisplay imageUrl={imageUrl} isLoading={loading.image} />
          {loading.itinerary && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center min-h-[300px]">
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-600">Generating your personalized itinerary...</p>
            </div>
          )}
          {itinerary && <ItineraryDisplay itinerary={itinerary} />}
        </div>
      )}
    </div>
  );
};

export default ItineraryPlanner;

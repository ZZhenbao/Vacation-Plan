
import React from 'react';
import Header from './components/Header';
import ItineraryPlanner from './components/ItineraryPlanner';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ItineraryPlanner />
      </main>
      <Footer />
    </div>
  );
};

export default App;

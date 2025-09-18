
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HealthAnalysis from './components/HealthAnalysis';
import MyRecords from './components/MyRecords';
import BookConsultation from './components/BookConsultation';
import type { View, HealthRecord, HealthAnalysisResult } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [records, setRecords] = useState<HealthRecord[]>([]);

  const addRecord = useCallback((result: HealthAnalysisResult) => {
    const newRecord: HealthRecord = {
      ...result,
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setRecords(prevRecords => [newRecord, ...prevRecords]);
    setCurrentView('records');
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'analysis':
        return <HealthAnalysis onAnalysisComplete={addRecord} />;
      case 'records':
        return <MyRecords records={records} />;
      case 'booking':
        return <BookConsultation />;
      case 'home':
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow w-full">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;


import React from 'react';
import type { View } from '../types';
import HeartIcon from './icons/HeartIcon';
// FIX: Import the StethoscopeIcon component to resolve the 'Cannot find name' error.
import StethoscopeIcon from './icons/StethoscopeIcon';

interface HeroProps {
  setView: (view: View) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <>
      <div className="relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-20 md:py-32">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Intelligent Health Insights,
                        <span className="block text-sky-600">Personalized for You.</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
                        Leverage our advanced AI to understand your health better. Get instant analysis, track your wellness journey, and connect with our world-class specialists.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => setView('analysis')}
                            className="inline-block w-full sm:w-auto px-8 py-4 bg-sky-600 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
                        >
                            Start Health Analysis
                        </button>
                        <button
                            onClick={() => setView('booking')}
                            className="inline-block w-full sm:w-auto px-8 py-4 bg-slate-200 text-slate-800 font-bold rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Book a Consultation
                        </button>
                    </div>
                </div>
                <div>
                    <img src="https://picsum.photos/seed/hospital/800/600" alt="Compassionate doctor with patient" className="rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>
      </div>
      <div className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">A New Era of Healthcare</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    We combine cutting-edge technology with compassionate care to provide a seamless health experience.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<HeartIcon className="h-8 w-8 text-sky-600" />} 
                    title="AI-Powered Analysis"
                    description="Get a quick, data-driven overview of your health based on your symptoms and lifestyle."
                />
                <FeatureCard 
                    icon={<StethoscopeIcon className="h-8 w-8 text-sky-600" />} 
                    title="Expert Consultations"
                    description="Easily book appointments with our team of experienced and caring medical professionals."
                />
                <FeatureCard 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                    title="Personal Records"
                    description="Securely save and review your health analysis results over time to track your progress."
                />
            </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
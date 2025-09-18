
import React, { useState } from 'react';
import { analyzeHealthData } from '../services/geminiService';
import type { HealthAnalysisResult } from '../types';

interface HealthAnalysisProps {
  onAnalysisComplete: (result: HealthAnalysisResult) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-sky-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-600 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-600 animate-bounce"></div>
        <span className="ml-2 text-slate-600">Analyzing your health profile...</span>
    </div>
);

const ResultDisplay: React.FC<{ result: HealthAnalysisResult; onSave: () => void }> = ({ result, onSave }) => (
    <div className="mt-8 bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Your Health Analysis</h3>
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg text-sky-700 mb-2">Summary</h4>
                <p className="text-slate-600 bg-sky-50 p-4 rounded-lg">{result.summary}</p>
            </div>
            <div>
                <h4 className="font-semibold text-lg text-red-700 mb-2">Potential Risk Factors</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-600 bg-red-50 p-4 rounded-lg">
                    {result.potentialRisks.map((risk, index) => <li key={index}>{risk}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg text-green-700 mb-2">Lifestyle Recommendations</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-600 bg-green-50 p-4 rounded-lg">
                    {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                </ul>
            </div>
             <p className="text-sm text-center text-slate-500 pt-4">This analysis is AI-generated and for informational purposes only. Always consult with a healthcare professional for medical advice.</p>
        </div>
        <div className="mt-8 text-center">
            <button
                onClick={onSave}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
            >
                Save to My Records
            </button>
        </div>
    </div>
);

const HealthAnalysis: React.FC<HealthAnalysisProps> = ({ onAnalysisComplete }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'prefer_not_to_say',
    symptoms: '',
    lifestyle: [] as string[],
    history: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HealthAnalysisResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLifestyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, lifestyle: [...prev.lifestyle, value] };
      } else {
        return { ...prev, lifestyle: prev.lifestyle.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.symptoms) {
        setError("Please fill in at least Age and Symptoms.");
        return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiResult = await analyzeHealthData(formData);
      setResult(apiResult);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return <div className="container mx-auto px-4 py-12"><ResultDisplay result={result} onSave={() => onAnalysisComplete(result)} /></div>;
  }

  return (
    <div className="bg-sky-50 py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-lg">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">AI Health Analysis</h2>
                    <p className="mt-4 text-slate-600">Fill in the details below to get a personalized health overview. This is not a medical diagnosis.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                            <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500">
                                <option value="prefer_not_to_say">Prefer not to say</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Lifestyle Factors (select all that apply)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {['Smoker', 'Regular Exercise', 'Balanced Diet', 'High Stress', 'Sufficient Sleep'].map(item => (
                                <label key={item} className="flex items-center space-x-2 text-sm text-slate-600">
                                    <input type="checkbox" value={item} onChange={handleLifestyleChange} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"/>
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-1">Describe your symptoms</label>
                        <textarea name="symptoms" id="symptoms" rows={4} value={formData.symptoms} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" placeholder="e.g., persistent headache, fatigue for the past week..." required></textarea>
                    </div>

                    <div>
                        <label htmlFor="history" className="block text-sm font-medium text-slate-700 mb-1">Relevant medical history (optional)</label>
                        <textarea name="history" id="history" rows={3} value={formData.history} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" placeholder="e.g., diagnosed with hypertension, allergic to penicillin..."></textarea>
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" disabled={loading} className="w-full sm:w-auto px-10 py-3 bg-sky-600 text-white font-semibold rounded-full shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
                            {loading ? <LoadingSpinner /> : 'Analyze My Health'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default HealthAnalysis;

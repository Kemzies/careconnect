
import React, { useState } from 'react';
import type { HealthRecord } from '../types';
import PlusIcon from './icons/PlusIcon';

interface MyRecordsProps {
  records: HealthRecord[];
}

const RecordCard: React.FC<{ record: HealthRecord; isOpen: boolean; onToggle: () => void }> = ({ record, isOpen, onToggle }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
        <button onClick={onToggle} className="w-full p-6 text-left flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-slate-800">{record.date}</h3>
                <p className="text-sm text-slate-500 mt-1 truncate max-w-md">{record.summary}</p>
            </div>
            <PlusIcon className={`h-6 w-6 text-sky-600 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        </button>
        {isOpen && (
            <div className="px-6 pb-6 pt-0 animate-fade-in-down">
                <div className="border-t pt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-md text-red-700 mb-2">Potential Risk Factors</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 bg-red-50 p-3 rounded-md">
                            {record.potentialRisks.map((risk, index) => <li key={index}>{risk}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-md text-green-700 mb-2">Lifestyle Recommendations</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 bg-green-50 p-3 rounded-md">
                            {record.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </div>
);


const MyRecords: React.FC<MyRecordsProps> = ({ records }) => {
  const [openRecordId, setOpenRecordId] = useState<string | null>(records.length > 0 ? records[0].id : null);

  const toggleRecord = (id: string) => {
    setOpenRecordId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">My Health Records</h2>
                    <p className="mt-4 text-slate-600">Review your past health analyses. Click on a record to expand.</p>
                </div>

                {records.length > 0 ? (
                    <div className="space-y-4">
                        {records.map(record => (
                            <RecordCard 
                                key={record.id} 
                                record={record}
                                isOpen={openRecordId === record.id}
                                onToggle={() => toggleRecord(record.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-4 text-xl font-semibold text-slate-800">No Records Found</h3>
                        <p className="mt-2 text-slate-500">You haven't saved any health analyses yet. </p>
                        <p className="mt-1 text-slate-500">Go to the Health Analysis page to get started.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MyRecords;

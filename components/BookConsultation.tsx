
import React, { useState } from 'react';

const BookConsultation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    department: 'General Medicine',
    reason: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server.
    console.log('Consultation Request:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center bg-teal-50 p-12 rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-3xl font-bold text-teal-900 mt-6">Thank You!</h2>
                    <p className="mt-4 text-lg text-teal-800">Your consultation request has been successfully submitted. Our team will contact you within 24 hours to confirm your appointment details.</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-lg">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Book a Consultation</h2>
                    <p className="mt-4 text-slate-600">Take the next step. Schedule an appointment with one of our specialists.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                            <select name="department" id="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500">
                                <option>General Medicine</option>
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Pediatrics</option>
                                <option>Dermatology</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
                            <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit (optional)</label>
                        <textarea name="reason" id="reason" rows={4} value={formData.reason} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" placeholder="Briefly describe your health concern..."></textarea>
                    </div>
                    <div className="text-center pt-4">
                        <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-sky-600 text-white font-semibold rounded-full shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default BookConsultation;

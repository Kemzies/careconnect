
import React from 'react';
import StethoscopeIcon from './icons/StethoscopeIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <StethoscopeIcon className="h-8 w-8 text-sky-400" />
              <span className="ml-3 text-2xl font-bold text-white">CareConnect AI</span>
            </div>
            <p className="text-sm text-slate-400">Your health, our priority. AI-powered insights for a better you.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Health Analysis</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Book Consultation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Pediatrics</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">General Medicine</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm">123 Health St, Wellness City</p>
            <p className="text-sm">contact@careconnect.ai</p>
            <p className="text-sm">(123) 456-7890</p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CareConnect AI. All rights reserved.</p>
           <p className="mt-1">Disclaimer: This website provides AI-generated analysis for informational purposes only and is not a substitute for professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

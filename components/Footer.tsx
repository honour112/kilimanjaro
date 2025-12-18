
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Kilimanjaro Stationary
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-sm">
              We Deliver Your Needs. Professional wholesale and retail supplier of quality printer ink and stationary supplies across Tanzania.
            </p>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Explore</h4>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 font-medium text-xs sm:text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Contact</h4>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 font-medium text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">WhatsApp:</span>
                <span className="font-bold">{WHATSAPP_NUMBER}</span>
              </li>
              <li>Tanzania - Nationwide Shipping</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-50 mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Kilimanjaro Stationary. All Rights Reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Page, Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  language: Language;
  toggleLanguage: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setPage, 
  language, 
  toggleLanguage, 
  cartCount, 
  onOpenCart 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = translations[language];

  const navItems = [
    { label: t.navHome, value: Page.HOME },
    { label: t.navShop, value: Page.SHOP },
    { label: t.navAbout, value: Page.ABOUT },
    { label: t.navDelivery, value: Page.DELIVERY },
    { label: t.navContact, value: Page.CONTACT },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer gap-3" onClick={() => setPage(Page.HOME)}>
            <img 
              src="https://i.postimg.cc/kG0pwSgQ/Whats-App-Image-2025-12-18-at-6-06-55-PM.jpg" 
              alt="Logo" 
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-600 shadow-sm"
            />
            <span className="text-xl md:text-2xl font-extrabold brand-font bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Kilimanjaro Stationary
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setPage(item.value)}
                  className={`${
                    currentPage === item.value
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-500'
                  } px-1 py-2 text-sm font-semibold transition-colors`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-gray-200"></div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                title={t.changeLanguage}
                className="bg-gray-50 hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.378 5 18.625" />
                </svg>
                {t.langToggle}
              </button>

              <button 
                onClick={onOpenCart}
                className="relative p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setPage(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-bold ${
                  currentPage === item.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              title={t.changeLanguage}
              className="w-full text-left px-3 py-3 text-base font-bold text-gray-500 border-t flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.378 5 18.625" />
              </svg>
              {t.langToggle}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

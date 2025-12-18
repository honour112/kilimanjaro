
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { Page, Language, Product, CartItem } from './types';
import { PRODUCTS, WHATSAPP_LINK, WHATSAPP_NUMBER } from './constants';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [language, setLanguage] = useState<Language>('sw');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    region: ''
  });

  const t = translations[language];

  useEffect(() => {
    const savedCart = localStorage.getItem('kilimanjaro_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('kilimanjaro_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sw' ? 'en' : 'sw');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage(Page.CHECKOUT);
    window.scrollTo(0, 0);
  };

  const completeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = `*HABARI KILIMANJARO STATIONARY*\n\n`;
    message += `Nahitaji kuweka oda ifuatayo:\n`;
    message += `------------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.name[language]} x${item.quantity} = TSh ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `------------------------------\n`;
    message += `*JUMLA: TSh ${total.toLocaleString()}*\n\n`;
    message += `*MAELEZO YA MTEJA:*\n`;
    message += `Jina: ${checkoutData.name}\n`;
    message += `Simu: ${checkoutData.phone}\n`;
    message += `Mkoa: ${checkoutData.region}\n\n`;
    message += `Asante! Nasubiri maelekezo ya malipo.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-20 lg:py-32 overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                      {t.heroTitle}
                    </h1>
                    <p className="text-xl md:text-3xl text-blue-100 mb-10 font-light tracking-wide max-w-2xl mx-auto lg:mx-0">
                      {t.heroSubtitle}
                    </p>
                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-[2rem] border border-white/20 mb-10 shadow-2xl inline-block w-full max-w-2xl">
                      <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.heroDescription}</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
                        {[t.heroFeature1, t.heroFeature2, t.heroFeature3].map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="flex-shrink-0 bg-green-500 rounded-full p-1.5 shadow-lg shadow-green-900/20">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-lg font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="text-3xl md:text-4xl font-black flex flex-col items-center sm:items-start">
                          <span className="text-blue-200 text-xs uppercase tracking-[0.3em] mb-2 font-bold">{t.heroPriceTag}</span>
                          <span>TSh 2,500 <span className="text-base font-medium text-blue-300">/ pc</span></span>
                        </div>
                        <button 
                          onClick={() => setCurrentPage(Page.SHOP)}
                          className="w-full sm:w-auto bg-white text-blue-800 hover:bg-blue-50 font-bold py-5 px-12 rounded-[1.25rem] transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.03] active:scale-95 text-lg"
                        >
                          {t.navShop} <span className="text-2xl">&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative hidden lg:block">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-tr from-white/20 to-transparent blur-2xl rounded-full"></div>
                      <img 
                        src="https://i.postimg.cc/vZpdkRgc/Whats-App-Image-2025-12-18-at-6-07-09-PM.jpg" 
                        alt="Hero" 
                        className="w-full h-auto rounded-[3rem] shadow-2xl relative z-10 object-cover aspect-[4/3] border-8 border-white/10"
                      />
                      <div className="absolute -bottom-8 -left-8 bg-blue-600 p-6 rounded-3xl shadow-2xl z-20 border-4 border-white animate-bounce-slow">
                        <p className="text-white font-black text-xl italic uppercase tracking-tighter">Mikoani Tunatuma!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div className="max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{t.ourProducts}</h2>
                  <p className="text-gray-500 mt-4 text-xl leading-relaxed">High-quality stationery at the best wholesale and retail prices in Tanzania.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage(Page.SHOP)}
                  className="bg-blue-50 text-blue-700 font-bold py-3 px-8 rounded-2xl hover:bg-blue-100 transition-all flex items-center gap-2 group border border-blue-100"
                >
                  {t.viewAll} 
                  <span className="group-hover:translate-x-1.5 transition-transform text-xl">&rarr;</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {PRODUCTS.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} language={language} onAddToCart={addToCart} />
                ))}
              </div>
            </section>
          </div>
        );

      case Page.SHOP:
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">{t.inkTitle} & {t.paperTitle}</h1>
            <p className="text-2xl text-gray-500 mb-16 max-w-2xl leading-relaxed font-light">{t.inkIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {PRODUCTS.map(p => (
                <ProductCard key={p.id} product={p} language={language} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        );

      case Page.CHECKOUT:
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-500">
            <h1 className="text-5xl font-black text-gray-900 mb-16 tracking-tight">{t.checkoutTitle}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <form onSubmit={completeOrder} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-50 space-y-8">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-2xl">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    {t.deliveryDetails}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{t.fullName}</label>
                      <input 
                        required
                        type="text" 
                        value={checkoutData.name}
                        onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                        className="w-full border-gray-100 border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{t.phoneNumber}</label>
                      <input 
                        required
                        type="tel" 
                        value={checkoutData.phone}
                        onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                        className="w-full border-gray-100 border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-lg"
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{t.region}</label>
                    <input 
                      required
                      type="text" 
                      value={checkoutData.region}
                      onChange={e => setCheckoutData({...checkoutData, region: e.target.value})}
                      className="w-full border-gray-100 border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-lg"
                      placeholder="Mwanza, Tanzania"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 rounded-[1.5rem] shadow-2xl shadow-green-200 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 text-xl"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.placeOrder}
                  </button>
                </form>
              </div>
              <div>
                <div className="bg-gray-100 p-10 rounded-[2.5rem] sticky top-28 border border-gray-200">
                  <h2 className="text-2xl font-black mb-8">{t.items} ({cart.length})</h2>
                  <div className="space-y-6 mb-10 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-6 group">
                        <div className="flex-1">
                          <p className="text-gray-800 font-bold leading-tight group-hover:text-blue-600 transition-colors">{item.name[language]}</p>
                          <p className="text-gray-500 text-sm mt-1">Quantity: <span className="font-bold">{item.quantity}</span></p>
                        </div>
                        <span className="font-black text-gray-900 whitespace-nowrap">TSh {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-dashed border-gray-300 pt-8 space-y-5">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-500 font-medium">{t.subtotal}</span>
                      <span className="font-bold text-gray-900">TSh {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">{t.total}</span>
                      <span className="text-4xl font-black text-blue-700 leading-none">TSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentPage(Page.SHOP)}
                    className="w-full mt-10 bg-gray-200/50 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">&larr;</span> {t.backToShop}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case Page.ABOUT:
        return (
          <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in duration-500">
            <h1 className="text-6xl font-black text-gray-900 mb-12 tracking-tighter">{t.aboutTitle}</h1>
            <div className="prose prose-2xl prose-blue text-gray-600 space-y-12 leading-loose font-light">
              <p className="text-2xl leading-relaxed">
                {t.aboutPara1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Stock Ready</h3>
                  <p className="text-lg">Tunahakikisha wino na karatasi zinapatikana kila wakati ili kuwahudumia wateja wetu bila ucheleweshaji.</p>
                </div>
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.183.394l-1.158.908a2 2 0 00-.597 2.37l.09.213a2 2 0 002.506 1.093l.214-.084a2 2 0 001.09-2.506l-.09-.213a2 2 0 01.597-2.37l1.158-.908a2 2 0 011.183-.394l1.936.387a6 6 0 003.86-.517l.318-.158a6 6 0 003.86-.517l2.387.477a2 2 0 011.022.547l1.158.908a2 2 0 01.597 2.37l-.09.213a2 2 0 01-2.506 1.093l-.214-.084a2 2 0 01-1.09 2.506l.09.213a2 2 0 01-.597 2.37l-1.158.908" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Originality</h3>
                  <p className="text-lg">Tunauza bidhaa asilia tu. Wino wetu ni salama kwa printer yako na unatoa matokeo bora kabisa.</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-16 rounded-[4rem] shadow-3xl relative overflow-hidden text-center group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <h2 className="text-4xl font-black text-white mb-8 relative z-10 tracking-tight">{t.visionTitle}</h2>
                <p className="text-blue-50 text-3xl font-medium italic relative z-10 leading-relaxed">&ldquo;{t.visionText}&rdquo;</p>
              </div>
            </div>
          </div>
        );

      case Page.DELIVERY:
        return (
          <div className="max-w-6xl mx-auto px-4 py-24 animate-in fade-in duration-500">
            <h1 className="text-6xl font-black text-gray-900 mb-16 text-center tracking-tighter">{t.deliveryTitle}</h1>
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div className="bg-white p-14 rounded-[4rem] shadow-2xl border border-gray-50 group hover:border-blue-200 transition-all">
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-10 text-blue-600 shadow-xl shadow-blue-50 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">{t.deliveryMikoani}</h2>
                <p className="text-gray-500 text-xl leading-relaxed mb-10">{t.deliveryMikoaniDesc}</p>
                <div className="p-6 bg-blue-50 rounded-2xl text-blue-800 font-black border-2 border-blue-100 flex items-center gap-4 text-lg">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {t.deliveryTime}
                </div>
              </div>
              <div className="bg-white p-14 rounded-[4rem] shadow-2xl border border-gray-50 group hover:border-green-200 transition-all">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-10 text-green-600 shadow-xl shadow-green-50 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">{t.paymentTitle}</h2>
                <p className="text-gray-500 text-xl leading-relaxed mb-10">{t.paymentDesc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {['M-Pesa', 'Tigo Pesa', 'Airtel Money'].map(net => (
                    <div key={net} className="text-center p-6 bg-gray-50 rounded-3xl font-black text-gray-800 text-lg border-2 border-gray-100 shadow-sm hover:bg-white transition-colors">
                      {net}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case Page.CONTACT:
        return (
          <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in duration-500 text-center">
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">{t.contactTitle}</h1>
            <p className="text-2xl text-gray-500 mb-20 font-light">{t.contactSubtitle}</p>
            <div className="bg-white p-16 md:p-24 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 max-w-2xl mx-auto relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-50/50 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-green-500 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-3xl shadow-green-200 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Chat Now</p>
                <a href={WHATSAPP_LINK} className="text-4xl md:text-5xl font-black text-gray-900 block mb-14 tracking-tighter hover:text-green-600 transition-colors">{WHATSAPP_NUMBER}</a>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-black py-8 rounded-[2.5rem] shadow-3xl shadow-green-200 transition-all hover:scale-[1.02] active:scale-95 text-2xl uppercase tracking-widest"
                >
                  Send Message Now
                </a>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-blue-600 selection:text-white">
      <Navbar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        language={language}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;

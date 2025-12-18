
import { Product } from './types';

export const WHATSAPP_NUMBER = '+255692440285';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`;

export const PRODUCTS: Product[] = [
  {
    id: 'bk-ink-premium',
    name: { sw: 'Wino wa Printer - Black (BK)', en: 'Printer Ink - Black (BK)' },
    price: 2500,
    description: { sw: 'Wino bora unaorangaza vizuri na kukausha haraka. Inafaa kwa kazi nzito.', en: 'High-quality ink with brilliant color and fast drying. Perfect for heavy-duty tasks.' },
    image: 'https://i.postimg.cc/5NKJ5Qf7/Whats-App-Image-2025-12-18-at-6-06-58-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP', 'Canon', 'Epson']
  },
  {
    id: 'cyan-ink-premium',
    name: { sw: 'Wino wa Printer - Cyan (C)', en: 'Printer Ink - Cyan (C)' },
    price: 2500,
    description: { sw: 'Rangi ya bluu angavu kwa picha zenye ubora wa juu na rangi halisi.', en: 'Bright blue color for high-quality photos and true-to-life colors.' },
    image: 'https://i.postimg.cc/pXcvQ5P0/Whats-App-Image-2025-12-18-at-6-06-59-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP', 'Canon', 'Epson']
  },
  {
    id: 'magenta-ink-premium',
    name: { sw: 'Wino wa Printer - Magenta (M)', en: 'Printer Ink - Magenta (M)' },
    price: 2500,
    description: { sw: 'Rangi ya magenta inayodumu muda mrefu bila kufifia kwenye karatasi.', en: 'Long-lasting magenta color without fading on paper.' },
    image: 'https://i.postimg.cc/pXcvQ5Pk/Whats-App-Image-2025-12-18-at-6-06-59-PM-1.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP', 'Canon', 'Epson']
  },
  {
    id: 'yellow-ink-premium',
    name: { sw: 'Wino wa Printer - Yellow (Y)', en: 'Printer Ink - Yellow (Y)' },
    price: 2500,
    description: { sw: 'Njano ya kuvutia kwa nakala zako za kila siku na ripoti za ofisi.', en: 'Attractive yellow for your daily copies and office reports.' },
    image: 'https://i.postimg.cc/CLr0Cnw3/Whats-App-Image-2025-12-18-at-6-07-00-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP', 'Canon', 'Epson']
  },
  {
    id: 'double-a-ream-standard',
    name: { sw: 'Karatasi za Double A (Ream Moja)', en: 'Double A Paper (Single Ream)' },
    price: 15000,
    description: { sw: 'Karatasi 500 za ubora wa juu (80gsm) kwa ajili ya ofisi au matumizi ya nyumbani.', en: '500 sheets of high-quality paper (80gsm) for office or home use.' },
    image: 'https://i.postimg.cc/kXYCNRn7/Whats-App-Image-2025-12-18-at-6-07-02-PM.jpg',
    category: { sw: 'Karatasi', en: 'Paper' }
  },
  {
    id: 'double-a-box-standard',
    name: { sw: 'Box la Karatasi za Double A (Ream 5)', en: 'Double A Paper Box (5 Reams)' },
    price: 70000,
    description: { sw: 'Box moja lenye ream 5 za karatasi bora, bei nafuu kwa jumla na matumizi makubwa.', en: 'One box containing 5 reams of premium paper, great wholesale price for high-volume use.' },
    image: 'https://i.postimg.cc/bNVP0Sqm/Whats-App-Image-2025-12-18-at-6-06-59-PM-2.jpg',
    category: { sw: 'Karatasi', en: 'Paper' }
  },
  {
    id: 'double-a-ream-alt',
    name: { sw: 'Double A - Professional Choice', en: 'Double A - Professional Choice' },
    price: 15000,
    description: { sw: 'Karatasi nyeupe sana inayotoa matokeo bora ya printi.', en: 'Ultra-white paper providing excellent print results.' },
    image: 'https://i.postimg.cc/8PXGdf1D/Whats-App-Image-2025-12-18-at-6-07-02-PM-1.jpg',
    category: { sw: 'Karatasi', en: 'Paper' }
  },
  {
    id: 'double-a-pack-multiple',
    name: { sw: 'Vifurushi vya Karatasi za Double A', en: 'Double A Paper Bundles' },
    price: 30000,
    description: { sw: 'Ream mbili za Double A kwa ajili ya kazi za haraka.', en: 'Two reams of Double A for quick tasks.' },
    image: 'https://i.postimg.cc/13LZ2xnV/Whats-App-Image-2025-12-18-at-6-07-12-PM-1.jpg',
    category: { sw: 'Karatasi', en: 'Paper' }
  },
  {
    id: 'hp-compatible-ink',
    name: { sw: 'Wino Maalum wa HP', en: 'Special HP Compatible Ink' },
    price: 2500,
    description: { sw: 'Wino ulioboreshwa kwa ajili ya printer za HP pekee.', en: 'Optimized ink specifically for HP printers.' },
    image: 'https://i.postimg.cc/L6QSkgHH/Whats-App-Image-2025-12-18-at-6-07-03-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP']
  },
  {
    id: 'canon-compatible-ink',
    name: { sw: 'Wino Maalum wa Canon', en: 'Special Canon Compatible Ink' },
    price: 2500,
    description: { sw: 'Wino ulioboreshwa kwa ajili ya printer za Canon.', en: 'Optimized ink specifically for Canon printers.' },
    image: 'https://i.postimg.cc/YqD7NLpM/Whats-App-Image-2025-12-18-at-6-07-03-PM-1.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['Canon']
  },
  {
    id: 'epson-compatible-ink',
    name: { sw: 'Wino Maalum wa Epson', en: 'Special Epson Compatible Ink' },
    price: 2500,
    description: { sw: 'Wino ulioboreshwa kwa ajili ya printer za Epson.', en: 'Optimized ink specifically for Epson printers.' },
    image: 'https://i.postimg.cc/wjtpwxv3/Whats-App-Image-2025-12-18-at-6-07-04-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['Epson']
  },
  {
    id: 'ink-full-set-premium',
    name: { sw: 'Seti Kamili ya Wino (Chupa 4)', en: 'Full Premium Ink Set (4 Bottles)' },
    price: 10000,
    description: { sw: 'Seti kamili ya wino (BK, C, M, Y) inayofaa kwa printer zote maarufu.', en: 'Complete ink set (BK, C, M, Y) suitable for all popular printers.' },
    image: 'https://i.postimg.cc/BndGkWL2/Whats-App-Image-2025-12-18-at-6-07-14-PM.jpg',
    category: { sw: 'Wino', en: 'Ink' },
    compatibility: ['HP', 'Canon', 'Epson']
  }
];

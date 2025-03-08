
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BusinessGrowth from '@/components/BusinessGrowth';
import Footer from '@/components/Footer';

// Sample featured product data that will be available on initial load
export const featuredProductsData = [
  {
    id: "1",
    title: "iPhone 13 Pro - Graphite",
    price: 699,
    originalPrice: 999,
    condition: "like-new" as const,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop",
    isVerified: true,
    category: "smartphones",
    description: "This iPhone 13 Pro features a powerful A15 Bionic chip, incredible camera system, and beautiful Super Retina XDR display. The device is in like-new condition with minimal signs of use.",
    sellerInfo: {
      name: "TechTreasures",
      rating: 4.9,
      verified: true,
      sales: 567
    },
    aiVerification: {
      authenticityScore: 98,
      conditionScore: 96,
      functionalityScore: 99
    },
    specs: [
      "6.1-inch Super Retina XDR display",
      "A15 Bionic chip",
      "Pro camera system with 12MP cameras",
      "128GB storage",
      "Face ID",
      "Battery life: Up to 22 hours video playback"
    ],
    videoUrl: "https://www.youtube.com/embed/XKfgdkcIUxw"
  },
  {
    id: "2",
    title: "MacBook Air M1 - Space Gray",
    price: 849,
    originalPrice: 999,
    condition: "good" as const,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop",
    isVerified: true,
    category: "laptops",
    description: "Experience incredible performance with the M1 chip MacBook Air. This device offers amazing battery life, silent operation, and powerful performance for all your tasks.",
    sellerInfo: {
      name: "LaptopLegend",
      rating: 4.8,
      verified: true,
      sales: 328
    },
    aiVerification: {
      authenticityScore: 97,
      conditionScore: 88,
      functionalityScore: 94
    },
    specs: [
      "13.3-inch Retina display",
      "Apple M1 chip",
      "8GB unified memory",
      "256GB SSD storage",
      "Up to 18 hours battery life",
      "Touch ID"
    ],
    videoUrl: "https://www.youtube.com/embed/jSBVWQmQY-k"
  },
  {
    id: "3",
    title: "Sony WH-1000XM4 Headphones",
    price: 249,
    originalPrice: 349,
    condition: "fair" as const,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop",
    isVerified: true,
    category: "audio",
    description: "Industry-leading noise cancellation with these premium Sony headphones. Get exceptional sound quality and long battery life for your music enjoyment.",
    sellerInfo: {
      name: "AudioPhile",
      rating: 4.6,
      verified: true,
      sales: 219
    },
    aiVerification: {
      authenticityScore: 95,
      conditionScore: 79,
      functionalityScore: 90
    },
    specs: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Touch controls",
      "Speak-to-chat technology",
      "Wear detection with auto-play/pause",
      "Multipoint connection"
    ],
    videoUrl: "https://www.youtube.com/embed/hjZzq8VASws"
  },
  {
    id: "4",
    title: "iPad Pro 12.9\" M1 Chip",
    price: 899,
    originalPrice: 1099,
    condition: "like-new" as const,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1374&auto=format&fit=crop",
    isVerified: true,
    category: "tablets",
    description: "The ultimate iPad experience with the M1 chip, stunning 12.9-inch Liquid Retina XDR display, and versatile features for both creative and professional use.",
    sellerInfo: {
      name: "iGadgets",
      rating: 4.9,
      verified: true,
      sales: 421
    },
    aiVerification: {
      authenticityScore: 99,
      conditionScore: 97,
      functionalityScore: 98
    },
    specs: [
      "12.9-inch Liquid Retina XDR display",
      "Apple M1 chip",
      "128GB storage",
      "Thunderbolt / USB 4 port",
      "Face ID",
      "All-day battery life"
    ],
    videoUrl: "https://www.youtube.com/embed/8auGAJrnpY4"
  }
];

// New product data for comparison
export const newProductsData = [
  {
    id: "n1",
    title: "iPhone 14 Pro - Alpine Blue",
    price: 999,
    originalPrice: 999,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1664478546384-d57e49cf5b3e?q=80&w=2070&auto=format&fit=crop",
    isVerified: true,
    category: "smartphones",
    description: "The latest iPhone 14 Pro featuring the Dynamic Island, Always-On display, and incredible 48MP camera system. Experience Apple's most advanced smartphone.",
    sellerInfo: {
      name: "Apple Official Store",
      rating: 5.0,
      verified: true,
      sales: 3254
    },
    specs: [
      "6.1-inch Super Retina XDR display with Always-On",
      "A16 Bionic chip",
      "Pro camera system with 48MP main camera",
      "Dynamic Island",
      "Crash Detection",
      "All-day battery life"
    ],
    videoUrl: "https://www.youtube.com/embed/WuEH265pUy4"
  },
  {
    id: "n2",
    title: "MacBook Pro M2 - Silver",
    price: 1299,
    originalPrice: 1299,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=1480&auto=format&fit=crop",
    isVerified: true,
    category: "laptops",
    description: "The MacBook Pro with M2 chip delivers incredible performance, amazing battery life, and the brilliant Liquid Retina display. Perfect for professionals and creatives.",
    sellerInfo: {
      name: "Apple Official Store",
      rating: 5.0,
      verified: true,
      sales: 1896
    },
    specs: [
      "13.3-inch Retina display",
      "Apple M2 chip",
      "8GB unified memory",
      "256GB SSD storage",
      "Up to 20 hours battery life",
      "Touch Bar and Touch ID"
    ],
    videoUrl: "https://www.youtube.com/embed/hMNi7hznUqE"
  },
  {
    id: "n3",
    title: "Sony WH-1000XM5 Headphones",
    price: 399,
    originalPrice: 399,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=2127&auto=format&fit=crop",
    isVerified: true,
    category: "audio",
    description: "Sony's latest flagship noise-cancelling headphones with improved isolation, crystal clear call quality, and premium sound. The next generation of audio excellence.",
    sellerInfo: {
      name: "Sony Official Store",
      rating: 5.0,
      verified: true,
      sales: 1542
    },
    specs: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Crystal clear calls",
      "8 microphones with Auto NC Optimizer",
      "Multipoint connection",
      "Premium design with new ear cups"
    ],
    videoUrl: "https://www.youtube.com/embed/Q7NcWZcKZOE"
  },
  {
    id: "n4",
    title: "iPad Pro 12.9\" M2 Chip",
    price: 1099,
    originalPrice: 1099,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1623126908029-58c31ac7e48e?q=80&w=2070&auto=format&fit=crop",
    isVerified: true,
    category: "tablets",
    description: "The most advanced iPad ever with the blazing-fast M2 chip, stunning mini-LED display, and Apple Pencil hover. Perfect for professional work and creative endeavors.",
    sellerInfo: {
      name: "Apple Official Store",
      rating: 5.0,
      verified: true,
      sales: 2156
    },
    specs: [
      "12.9-inch Liquid Retina XDR display",
      "Apple M2 chip",
      "Thunderbolt / USB 4 port",
      "Apple Pencil hover experience",
      "Face ID",
      "All-day battery life"
    ],
    videoUrl: "https://www.youtube.com/embed/I-t2mwrYC6s"
  }
];

// Save product data to localStorage to persist it across refreshes
const saveProductDataToLocalStorage = () => {
  try {
    localStorage.setItem('featuredProducts', JSON.stringify(featuredProductsData));
    localStorage.setItem('newProducts', JSON.stringify(newProductsData));
  } catch (error) {
    console.error('Error saving product data to localStorage:', error);
  }
};

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Save product data for persistence
    saveProductDataToLocalStorage();
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts 
          featuredProducts={featuredProductsData} 
          newProducts={newProductsData} 
        />
        <BusinessGrowth />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

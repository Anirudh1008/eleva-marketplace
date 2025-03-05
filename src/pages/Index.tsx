
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import AIVerification from '@/components/AIVerification';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth';
    
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
        <FeaturedProducts />
        <AIVerification />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

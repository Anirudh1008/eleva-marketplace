
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeftRight, Check, X, Info, Zap, ArrowRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompareItem {
  id: string;
  title: string;
  image: string;
  condition: string;
  price: number;
  originalPrice: number;
  specs: { [key: string]: string | number };
  isVerified: boolean;
}

const sampleDevices: CompareItem[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Graphite',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop',
    condition: 'Like New',
    price: 699,
    originalPrice: 999,
    specs: {
      'Screen': '6.1" Super Retina XDR',
      'Processor': 'A15 Bionic',
      'Storage': '128GB',
      'Camera': '12MP Triple',
      'Battery': '3095 mAh',
      'OS': 'iOS 15'
    },
    isVerified: true
  },
  {
    id: '2',
    title: 'iPhone 14 Pro - Deep Purple',
    image: 'https://images.unsplash.com/photo-1663072863686-331923a2ce82?q=80&w=1374&auto=format&fit=crop',
    condition: 'New',
    price: 999,
    originalPrice: 999,
    specs: {
      'Screen': '6.1" Super Retina XDR',
      'Processor': 'A16 Bionic',
      'Storage': '256GB',
      'Camera': '48MP Triple',
      'Battery': '3200 mAh',
      'OS': 'iOS 16'
    },
    isVerified: true
  }
];

const Compare: React.FC = () => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>(sampleDevices);
  const navigate = useNavigate();
  
  const handleBuyNow = (product: CompareItem) => {
    navigate('/payment', { state: { product } });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="section-container">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-medium mb-4">
              <ArrowLeftRight size={16} className="mr-2" />
              <span>Compare Products</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Product Comparison
            </h1>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare similar products side by side to find the best value for your needs.
              Our AI analyzes specs, pricing, and user reviews to help you make informed decisions.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 md:p-8 mb-10 animate-fade-in">
            <div className="grid grid-cols-2 gap-8">
              {compareItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex flex-col border border-white/20 rounded-lg overflow-hidden animate-fade-in bg-white/50"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative p-4 bg-gradient-to-b from-accent/10 to-transparent">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4 border border-white/30 shadow-md">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {item.isVerified && (
                      <div className="absolute top-6 right-6 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        AI Verified
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    
                    <div className="flex items-center mb-4">
                      <span className="bg-accent/10 text-accent text-sm font-medium px-2 py-0.5 rounded">
                        {item.condition}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-end">
                        <IndianRupee size={18} className="mr-1" />
                        <span className="text-2xl font-bold">{Math.round(item.price * 83).toLocaleString()}</span>
                        {item.price < item.originalPrice && (
                          <span className="text-sm line-through text-muted-foreground ml-2">
                            ₹{Math.round(item.originalPrice * 83).toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      {item.price < item.originalPrice && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ₹{Math.round((item.originalPrice - item.price) * 83).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white flex-grow">
                    <h4 className="font-medium mb-3 text-muted-foreground text-sm">Specifications</h4>
                    <div className="space-y-3">
                      {Object.entries(item.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <Button className="w-full" onClick={() => handleBuyNow(item)}>Buy Now</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-accent/5 rounded-lg p-4 border border-accent/20">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent/10 rounded-full text-accent mt-1">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">AI Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    The iPhone 13 Pro offers better value for money with similar performance to iPhone 14 Pro. 
                    You save ₹{Math.round((999 - 699) * 83).toLocaleString()} with only minor differences in camera and processor.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Need More Options?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {['Search Products', 'Browse Categories', 'Set Price Alerts'].map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass p-6 rounded-xl card-hover flex flex-col items-center text-center animate-fade-in"
                  style={{ animationDelay: `${idx * 150 + 300}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-3">{item}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {idx === 0 ? 'Find exactly what you need to compare' : 
                     idx === 1 ? 'Explore products by type and brand' : 
                     'Get notified when prices drop'}
                  </p>
                  <Button variant="ghost" className="rounded-full mt-auto">
                    {item === 'Search Products' ? 'Search Now' : 
                     item === 'Browse Categories' ? 'Browse' : 'Set Alert'}
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compare;

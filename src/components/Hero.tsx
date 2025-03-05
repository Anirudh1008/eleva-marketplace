
import React from 'react';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent"></div>
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01MCA1MGgxMDB2MTAwSDUwVjUwWiIgZmlsbD0iIzBhYTVlOSIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
              <Zap size={14} className="mr-1" />
              <span>AI-Powered Electronics Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-delayed">
              The Smarter Way to Buy & Sell Electronics
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 opacity-0 animate-fade-in-delayed-lg">
              Discover verified second-hand and new electronics with AI-powered verification,
              pricing insights, and fraud detection—all in one seamless platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-in-delayed-lg">
              <Button size="lg" className="rounded-full button-hover">
                Shop Now
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full button-hover">
                Sell Your Device
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: <Shield className="w-8 h-8 text-accent" />, 
                title: "AI Verification", 
                description: "Every product is verified by our AI for quality and authenticity"
              },
              { 
                icon: <Cpu className="w-8 h-8 text-accent" />, 
                title: "Smart Pricing", 
                description: "Get real-time market insights and fair price recommendations"
              },
              { 
                icon: <Zap className="w-8 h-8 text-accent" />, 
                title: "Instant Comparison", 
                description: "Compare new vs used options to find the best value"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass p-6 rounded-2xl card-hover flex flex-col items-center text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="mb-4 p-3 rounded-xl bg-accent/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import { ArrowRight, Zap, Shield, Cpu, SplitSquareVertical, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 to-transparent"></div>
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01MCA1MGgxMDB2MTAwSDUwVjUwWiIgZmlsbD0iIzBhYTVlOSIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>
      
      {/* Floating elements - decorative */}
      <div className="absolute top-20 left-[5%] w-24 h-24 bg-accent/5 rounded-full filter blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-[10%] w-32 h-32 bg-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-medium mb-8 animate-fade-in shadow-sm">
              <Zap size={16} className="mr-2" strokeWidth={2.5} />
              <span>AI-Powered Electronics Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-delayed bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/80">
              The Smarter Way to Buy & Sell Electronics
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-10 opacity-0 animate-fade-in-delayed-lg">
              Discover verified second-hand and new electronics with AI-powered verification,
              pricing insights, and fraud detection—all in one seamless platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-16 opacity-0 animate-fade-in-delayed-lg">
              <Link to="/shop">
                <Button size="lg" className="rounded-full button-hover bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20">
                  Shop Now
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" size="lg" className="rounded-full button-hover border-accent text-accent hover:bg-accent/10">
                  Sell Your Device
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Shield className="w-10 h-10 text-accent" />, 
                title: "AI Verification", 
                description: "Every product is verified by our AI for quality and authenticity",
                link: "/ai-verification"
              },
              { 
                icon: <DollarSign className="w-10 h-10 text-accent" />, 
                title: "Smart Pricing", 
                description: "Get real-time market insights and fair price recommendations",
                link: "/smart-pricing"
              },
              { 
                icon: <SplitSquareVertical className="w-10 h-10 text-accent" />, 
                title: "Instant Comparison", 
                description: "Compare new vs used options to find the best value",
                link: "/instant-comparison"
              }
            ].map((feature, index) => (
              <Link to={feature.link} key={index}>
                <div 
                  className="glass p-8 rounded-2xl card-hover flex flex-col items-center text-center opacity-0 animate-fade-in shadow-lg border border-white/20 backdrop-blur-lg"
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                >
                  <div className="mb-5 p-4 rounded-xl bg-accent/15 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Cpu className="w-10 h-10 text-accent" />, 
                title: "Shop Now", 
                description: "Browse our curated marketplace of AI-recommended electronics",
                link: "/shop"
              },
              { 
                icon: <Zap className="w-10 h-10 text-accent" />, 
                title: "Sell Now", 
                description: "List your device with AI pricing suggestions and connect with buyers",
                link: "/sell"
              },
              { 
                icon: <RefreshCw className="w-10 h-10 text-accent" />, 
                title: "AI Swap & Trade", 
                description: "Exchange your electronics and get the best trade-in value",
                link: "/swap-trade"
              }
            ].map((feature, index) => (
              <Link to={feature.link} key={index}>
                <div 
                  className="glass p-8 rounded-2xl card-hover flex flex-col items-center text-center opacity-0 animate-fade-in shadow-lg border border-white/20 backdrop-blur-lg"
                  style={{ animationDelay: `${index * 100 + 900}ms` }}
                >
                  <div className="mb-5 p-4 rounded-xl bg-accent/15 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

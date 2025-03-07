
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeftRight, ShieldCheck, Calculator, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SwapTrade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="relative py-16 mb-10 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 to-transparent"></div>
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01MCA1MGgxMDB2MTAwSDUwVjUwWiIgZmlsbD0iIzBhYTVlOSIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-medium mb-5">
                <RefreshCw size={16} className="mr-2" />
                <span>AI-Powered Exchange Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-600">Swap & Trade</span> Your Electronics
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our intelligent swap and trade platform helps you exchange your electronics for new ones,
                with AI-driven valuations and fair trade offers.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calculator className="h-10 w-10 text-accent" />,
                title: "Smart Valuations",
                description: "AI-powered assessment of your device's trade-in value based on condition, market demand, and model."
              },
              {
                icon: <ArrowLeftRight className="h-10 w-10 text-green-500" />,
                title: "Easy Exchanges",
                description: "Seamlessly swap your current device for a newer model with transparent trade-in differences."
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-amber-500" />,
                title: "Verified Trades",
                description: "All swap partners and devices are verified through our AI security system for safe exchanges."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass border border-white/20 backdrop-blur-lg shadow-xl">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-accent/15 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How Swap & Trade Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Evaluate Your Device",
                  description: "Submit details and photos of your current device. Our AI system will assess its condition and value."
                },
                {
                  number: "02",
                  title: "Browse Swap Options",
                  description: "Explore available devices that you can trade for, with AI-calculated trade difference values."
                },
                {
                  number: "03",
                  title: "Propose Trade",
                  description: "Select the device you want and propose a swap. The owner will receive your offer with the AI valuation."
                },
                {
                  number: "04",
                  title: "Complete Exchange",
                  description: "Once accepted, coordinate the exchange through our secure platform with protection guarantees."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="glass p-8 md:p-12 rounded-2xl border border-white/20 backdrop-blur-lg shadow-xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Featured Trade: iPhone 14 Pro → iPhone 15 Pro</h3>
                <p className="text-muted-foreground mb-6">
                  Trade in your iPhone 14 Pro (Good condition) for the latest iPhone 15 Pro. Our AI system calculates a fair trade value.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Your Device Value:</span>
                    <span className="font-semibold">$640</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Device Value:</span>
                    <span className="font-semibold">$999</span>
                  </div>
                  <div className="flex justify-between text-accent font-semibold">
                    <span>Trade Difference:</span>
                    <span>$359</span>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">
                  Explore This Trade
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-40 h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop" 
                      alt="iPhone 14 Pro" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ArrowRight size={40} className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 text-accent" />
                  <div className="w-40 h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-lg absolute -right-48 top-0">
                    <img 
                      src="https://images.unsplash.com/photo-1695048133142-1a20484426d8?q=80&w=1470&auto=format&fit=crop" 
                      alt="iPhone 15 Pro" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent/10 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Electronics?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Use our Swap & Trade platform to get the best value when upgrading to new devices.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Swapping
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Available Devices
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SwapTrade;

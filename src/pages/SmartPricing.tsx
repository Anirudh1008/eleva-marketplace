
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DollarSign, TrendingUp, BarChart2, ArrowRight, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SmartPricing = () => {
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
                <DollarSign size={16} className="mr-2" />
                <span>AI-Powered Price Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Get the <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-600">Perfect Price</span> with Smart Pricing
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-driven smart pricing system analyzes market trends, product conditions, 
                and demand patterns to suggest optimal prices for buyers and sellers.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 text-accent" />,
                title: "Market Trend Analysis",
                description: "Real-time analysis of market trends and price fluctuations to help you make informed decisions."
              },
              {
                icon: <BarChart2 className="h-10 w-10 text-green-500" />,
                title: "Fair Price Suggestions",
                description: "AI-generated price recommendations based on condition, age, demand, and comparable products."
              },
              {
                icon: <PieChart className="h-10 w-10 text-amber-500" />,
                title: "Value Depreciation Insights",
                description: "Understand how electronic devices depreciate over time and how to maximize resale value."
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
            <h2 className="text-3xl font-bold mb-12 text-center">How Smart Pricing Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Data Collection",
                  description: "Our system continuously collects pricing data from thousands of online marketplaces, retailers, and auction sites."
                },
                {
                  number: "02",
                  title: "Condition Assessment",
                  description: "AI evaluates the condition of your device through images and specifications to factor into the price recommendation."
                },
                {
                  number: "03",
                  title: "Market Analysis",
                  description: "Sophisticated algorithms analyze supply, demand, seasonality, and regional price variations."
                },
                {
                  number: "04",
                  title: "Price Recommendation",
                  description: "Based on all factors, the system generates a fair price range with explanations and confidence levels."
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

        <section className="bg-accent/10 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get the Perfect Price?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Whether you're buying or selling, our Smart Pricing tools ensure you get the best possible deal.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/sell">
                  <Button size="lg" className="w-full sm:w-auto">
                    Price Your Device
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Find Fair-Priced Electronics
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

export default SmartPricing;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IndianRupee, TrendingUp, TrendingDown, LineChart, BarChart4, ArrowRight, Clock, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SmartPricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="relative py-16 mb-10 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01MCA1MGgxMDB2MTAwSDUwVjUwWiIgZmlsbD0iIzBhYTVlOSIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-600 text-sm font-medium mb-5">
                <IndianRupee size={16} className="mr-2" />
                <span>AI-Powered Price Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Optimize Your Price with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Smart Pricing</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI analyzes market trends, demand patterns, and competitive pricing to suggest 
                the optimal price for your electronics - whether you're buying or selling.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <LineChart className="h-10 w-10 text-purple-500" />,
                title: "Market Trend Analysis",
                description: "Our AI tracks price fluctuations across multiple marketplaces to identify the perfect timing for buying or selling electronics."
              },
              {
                icon: <BarChart4 className="h-10 w-10 text-pink-500" />,
                title: "Competitive Price Comparison",
                description: "Compare your product's price against thousands of similar listings to ensure you're offering a competitive deal."
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-500" />,
                title: "Price Prediction",
                description: "AI forecasts future price trends, helping you decide whether to sell now or wait for a better market opportunity."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass border border-purple-100/20 backdrop-blur-lg shadow-xl">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-purple-500/15 w-fit">
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
                  description: "Our system continuously gathers pricing data from major marketplaces, auction sites, and retail stores for accurate comparisons."
                },
                {
                  number: "02",
                  title: "Condition-Based Adjustment",
                  description: "The AI factors in your product's condition (compared to similar listings) and adjusts the price recommendation accordingly."
                },
                {
                  number: "03",
                  title: "Demand Analysis",
                  description: "We analyze search volumes, seasonal trends, and product lifecycle to determine current market demand and its impact on pricing."
                },
                {
                  number: "04",
                  title: "Personalized Recommendation",
                  description: "Based on your goals (quick sale vs. maximum profit) and timeline, we provide a customized pricing strategy with minimum and maximum ranges."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-600 font-bold">
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

        <section className="bg-purple-500/10 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get the Best Price?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Whether you're buying or selling, our AI Smart Pricing tool ensures you make data-driven decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/sell">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
                    Price Your Product
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-300 text-purple-700 hover:bg-purple-50">
                    Check Price Trends
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Price History Example Chart */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sample Price Analysis</h2>
            
            <div className="glass border border-purple-100/20 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">iPhone 13 Pro - 6 Month Price Trend</h3>
                <p className="text-muted-foreground">Based on 1,245 listings in Like New condition</p>
              </div>
              
              <div className="h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg flex items-center justify-center mb-6">
                <p className="text-muted-foreground italic">Price trend visualization would appear here</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-medium">Best Time to Buy</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Mid-September (post-launch season)</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
                    <h4 className="font-medium">Best Time to Sell</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Early August (pre-launch season)</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <IndianRupee className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium">Recommended Price</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">₹58,000 - ₹62,000 (Like New)</p>
                </div>
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

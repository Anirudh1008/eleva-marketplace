
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SplitSquareVertical, BarChart, ArrowLeftRight, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const InstantComparison = () => {
  // Sample comparison data
  const comparisonExample = [
    { feature: "Price", new: "$999", used: "$699", difference: "-30%" },
    { feature: "Condition", new: "Perfect", used: "Like New", difference: "Minor signs of use" },
    { feature: "Warranty", new: "1 Year Manufacturer", used: "90 Days Seller", difference: "- 9 months" },
    { feature: "Battery Health", new: "100%", used: "87%", difference: "-13%" },
    { feature: "Accessories", new: "Full Package", used: "Charger Only", difference: "Missing box, manual" }
  ];

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
                <SplitSquareVertical size={16} className="mr-2" />
                <span>AI-Powered Comparison Tool</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-600">Compare & Decide</span> with Instant Comparison
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our smart comparison system helps you make informed decisions by comparing 
                new vs. used options, similar models, and price-to-value ratios.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ArrowLeftRight className="h-10 w-10 text-accent" />,
                title: "New vs. Used Comparison",
                description: "Compare pricing, condition, warranty, and value between new and pre-owned electronics."
              },
              {
                icon: <BarChart className="h-10 w-10 text-green-500" />,
                title: "Model Comparison",
                description: "Side-by-side feature and specification comparison between similar models to find the best match."
              },
              {
                icon: <SplitSquareVertical className="h-10 w-10 text-amber-500" />,
                title: "Value Analysis",
                description: "AI-driven insights into which option offers the best value for your specific needs and budget."
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
            <h2 className="text-3xl font-bold mb-10 text-center">Sample Comparison: iPhone 13 Pro</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full glass border border-white/20 backdrop-blur-lg shadow-xl rounded-xl">
                <thead>
                  <tr className="bg-accent/10">
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-left">New</th>
                    <th className="px-6 py-4 text-left">Used (AI Verified)</th>
                    <th className="px-6 py-4 text-left">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonExample.map((item, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="px-6 py-4 font-medium">{item.feature}</td>
                      <td className="px-6 py-4">{item.new}</td>
                      <td className="px-6 py-4">{item.used}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.difference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">AI Recommendation: <span className="text-accent font-medium">The used option offers better value at 70% of the new price with only minor condition differences.</span></p>
              <Button variant="outline" size="sm">
                See Full Comparison
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How Instant Comparison Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Select Products",
                  description: "Choose the items you want to compare, whether new vs. used versions or different models."
                },
                {
                  number: "02",
                  title: "AI Analysis",
                  description: "Our system automatically analyzes key specifications, prices, conditions, and value factors."
                },
                {
                  number: "03",
                  title: "Side-by-Side Comparison",
                  description: "View a comprehensive side-by-side comparison with all important factors highlighted."
                },
                {
                  number: "04",
                  title: "AI Recommendations",
                  description: "Receive personalized recommendations based on your priorities (budget, condition, features)."
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
              <h2 className="text-3xl font-bold mb-6">Ready to Compare Products?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Use our instant comparison tool to find the best products for your needs and budget.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/compare">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Comparing
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Products
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

export default InstantComparison;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Check, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AIVerification = () => {
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
                <Shield size={16} className="mr-2" />
                <span>AI-Powered Verification System</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Trust & Verify with <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-600">AI Verification</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our advanced AI verification system analyzes product images, videos, and data 
                to ensure authenticity, detect fraud, and provide accurate condition reports.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-accent" />,
                title: "Authenticity Verification",
                description: "Our AI analyzes images and product details to verify authenticity, comparing against manufacturer databases to catch counterfeits."
              },
              {
                icon: <Check className="h-10 w-10 text-green-500" />,
                title: "Condition Assessment",
                description: "Advanced image processing evaluates physical condition, wear and tear, and functionality to provide accurate condition ratings."
              },
              {
                icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
                title: "Fraud Detection",
                description: "Pattern recognition algorithms identify suspicious listings, helping protect buyers from scams and fraudulent sellers."
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
            <h2 className="text-3xl font-bold mb-12 text-center">How AI Verification Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Upload & Analyze",
                  description: "Sellers upload multiple photos and videos of their product. Our AI system analyzes visual data using computer vision algorithms."
                },
                {
                  number: "02",
                  title: "Verify & Validate",
                  description: "The system cross-references with manufacturer databases and checks serial numbers to confirm authenticity."
                },
                {
                  number: "03",
                  title: "Condition Report",
                  description: "AI generates a detailed condition report, highlighting any defects, wear patterns, or functionality issues."
                },
                {
                  number: "04",
                  title: "Fraud Check",
                  description: "Our system runs multiple fraud detection algorithms to identify suspicious listings or seller behaviors."
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
              <h2 className="text-3xl font-bold mb-6">Ready to Sell or Buy with Confidence?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Use our AI verification system to ensure authenticity and fair pricing for all your electronic transactions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/sell">
                  <Button size="lg" className="w-full sm:w-auto">
                    Sell with AI Verification
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Shop Verified Products
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

export default AIVerification;

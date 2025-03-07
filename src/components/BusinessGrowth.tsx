
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, TrendingUp, Lock, RefreshCcw, Bot, Mail } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BusinessGrowth = () => {
  const handleSubscribe = (email: string) => {
    toast({
      title: "Subscribed successfully!",
      description: "You'll receive updates about the latest tech deals.",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Business Growth */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Grow Your Electronics Business</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of sellers and repair services showcasing their products and services on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-accent" size={24} />,
                title: "Verified Products",
                description: "Build trust with AI-powered verification badges that showcase product authenticity."
              },
              {
                icon: <Users className="text-accent" size={24} />,
                title: "Reach More Customers",
                description: "Connect with targeted buyers looking for exactly what you're offering."
              },
              {
                icon: <TrendingUp className="text-accent" size={24} />,
                title: "Boost Sales",
                description: "Leverage AI-driven recommendations to increase your product visibility and sales."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-accent/10"
              >
                <div className="mb-4 p-3 rounded-full bg-accent/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Support */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security & Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ensure safe transactions and provide comprehensive support for all users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="text-green-500" size={24} />,
                title: "Secure Payments",
                description: "All transactions are protected by our escrow payment system."
              },
              {
                icon: <RefreshCcw className="text-blue-500" size={24} />,
                title: "Money-Back Guarantee",
                description: "14-day return policy for peace of mind shopping."
              },
              {
                icon: <Bot className="text-purple-500" size={24} />,
                title: "24/7 AI Support",
                description: "Get instant help with our automated customer assistance."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-accent/10"
              >
                <div className="mb-4 p-3 rounded-full bg-accent/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="glass rounded-2xl p-8 text-center border border-accent/10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Tech Deals</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and never miss out on the latest technology deals and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent/20 w-full sm:w-auto"
              />
              <Button 
                onClick={() => handleSubscribe("email")}
                className="w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessGrowth;

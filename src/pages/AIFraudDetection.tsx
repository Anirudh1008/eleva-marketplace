
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock, AlertTriangle, ShieldCheck, Search, ArrowRight, Phone, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AIFraudDetection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="relative py-16 mb-10 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-500/10 to-transparent"></div>
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01MCA1MGgxMDB2MTAwSDUwVjUwWiIgZmlsbD0iIzBhYTVlOSIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/15 text-red-600 text-sm font-medium mb-5">
                <Lock size={16} className="mr-2" />
                <span>AI-Powered Fraud Protection</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Shop with <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Complete Confidence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our advanced AI fraud detection system helps protect buyers and sellers from 
                scams, counterfeit products, and stolen electronics.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-red-500" />,
                title: "Counterfeit Detection",
                description: "Our AI uses computer vision to detect visual inconsistencies and manufacturing defects that indicate counterfeit products."
              },
              {
                icon: <Phone className="h-10 w-10 text-orange-500" />,
                title: "Stolen Device Check",
                description: "We verify IMEI numbers and device IDs against global databases of stolen electronics to prevent trafficking of stolen goods."
              },
              {
                icon: <Share2 className="h-10 w-10 text-yellow-500" />,
                title: "Seller Analysis",
                description: "AI analyzes seller behavior patterns to identify suspicious activities and potential fraud before transactions occur."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass border border-red-100/20 backdrop-blur-lg shadow-xl">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-red-500/15 w-fit">
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
            <h2 className="text-3xl font-bold mb-12 text-center">How AI Fraud Detection Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Data Analysis",
                  description: "Our AI analyzes product information, seller history, and transaction patterns to identify potential red flags."
                },
                {
                  number: "02",
                  title: "Device Verification",
                  description: "We check serial numbers and device IDs against manufacturer databases and stolen device registries."
                },
                {
                  number: "03",
                  title: "Image Authentication",
                  description: "Advanced computer vision compares product images against known genuine products to detect visual inconsistencies."
                },
                {
                  number: "04",
                  title: "Trust Score Generation",
                  description: "We generate a comprehensive trust score for every listing based on multiple verification factors."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center text-red-600 font-bold">
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

        <section className="container mx-auto px-4 mb-20">
          <div className="glass border border-red-100/20 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
                  <AlertTriangle size={14} className="mr-1" />
                  <span>Did You Know?</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">1 in 5 Electronics Online Are Counterfeit or Stolen</h3>
                <p className="text-muted-foreground mb-6">
                  The electronic black market is a growing concern, with billions lost annually to counterfeit and stolen devices. 
                  Our AI protection helps ensure you never become part of this statistic.
                </p>
                <div className="space-y-4">
                  {[
                    "Over 20% of online electronics sales involve counterfeit products",
                    "More than 3.1 million smartphones are stolen annually in India alone",
                    "Only 10% of stolen electronics are ever recovered by their owners"
                  ].map((fact, index) => (
                    <div key={index} className="flex items-start">
                      <ShieldCheck className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 lg:p-12 text-white flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Verify Before You Buy</h3>
                  <p className="text-white/80 mb-6">
                    Use our AI verification system to ensure any product you're interested in is genuine, 
                    legitimate, and safe to purchase.
                  </p>
                  <Link to="/shop">
                    <Button className="bg-white text-red-600 hover:bg-white/90">
                      Shop Protected Products
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-red-500/10 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Shop with Peace of Mind</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Our AI protection is active on all transactions, ensuring both buyers and sellers 
                have the safest electronics marketplace experience.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/verify-device">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                    Verify a Device
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/report-fraud">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-300 text-red-700 hover:bg-red-50">
                    Report Suspicious Activity
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

export default AIFraudDetection;

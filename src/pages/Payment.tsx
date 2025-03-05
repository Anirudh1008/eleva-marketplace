
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Shield, ArrowLeft, Check, Truck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No product selected</h2>
            <p className="mb-6 text-muted-foreground">Please select a product to proceed with payment</p>
            <Button onClick={() => navigate('/')} className="button-hover">
              <ArrowLeft size={16} className="mr-2" />
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Your order for ${product.title} has been placed successfully.`,
        variant: "default",
      });
      
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container max-w-5xl">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Secure Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-xl p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                
                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-accent/50 hover:bg-accent/5 ${paymentMethod === 'card' ? 'border-accent bg-accent/10' : 'border-border'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                        <CreditCard size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Credit/Debit Card</h3>
                        <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                      </div>
                      {paymentMethod === 'card' && (
                        <Check size={20} className="ml-auto text-accent" />
                      )}
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Card Number</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Expiry Date</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">CVV</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name on Card</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-accent/50 hover:bg-accent/5 ${paymentMethod === 'upi' ? 'border-accent bg-accent/10' : 'border-border'}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                        <Wallet size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">UPI / Net Banking</h3>
                        <p className="text-sm text-muted-foreground">Pay using UPI or Net Banking</p>
                      </div>
                      {paymentMethod === 'upi' && (
                        <Check size={20} className="ml-auto text-accent" />
                      )}
                    </div>
                    
                    {paymentMethod === 'upi' && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">UPI ID</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                            placeholder="name@upi"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-accent/50 hover:bg-accent/5 ${paymentMethod === 'cod' ? 'border-accent bg-accent/10' : 'border-border'}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                        <Truck size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cash on Delivery</h3>
                        <p className="text-sm text-muted-foreground">Pay when you receive your item</p>
                      </div>
                      {paymentMethod === 'cod' && (
                        <Check size={20} className="ml-auto text-accent" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 animate-fade-in-delayed">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="John"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="123 Main St"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Mumbai"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex items-start space-x-4 mb-6 pb-6 border-b">
                  <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">Condition: {product.condition}</p>
                    <div className="text-lg font-bold mt-1">₹{(product.price * 83).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{(product.price * 83).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">₹199</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">₹{Math.round(product.price * 83 * 0.18).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Math.round(product.price * 83 * 1.18 + 199).toLocaleString()}</span>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleSubmitPayment} 
                    className="w-full py-6 button-hover" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Complete Payment'}
                    {!isProcessing && <Shield size={16} className="ml-2" />}
                  </Button>
                  
                  <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
                    <Shield size={14} className="mr-1" />
                    <span>Secure Checkout | All payment methods are protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;

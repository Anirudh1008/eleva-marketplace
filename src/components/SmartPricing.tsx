
import React, { useState } from 'react';
import { Zap, Cpu, ArrowRight, Check, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PricingResult {
  suggestedPrice: number;
  marketHigh: number;
  marketLow: number;
  averagePrice: number;
  condition: string;
  confidence: number;
}

const SmartPricing: React.FC = () => {
  const [productInfo, setProductInfo] = useState({
    category: '',
    brand: '',
    model: '',
    age: '',
    condition: ''
  });
  
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null);
  
  const handleInputChange = (field: string, value: string) => {
    setProductInfo({
      ...productInfo,
      [field]: value
    });
  };
  
  const calculatePrice = () => {
    setIsCalculating(true);
    
    // Simulate API call to get pricing data
    setTimeout(() => {
      setIsCalculating(false);
      setStep(2);
      
      // Example result based on the product info
      const result: PricingResult = {
        suggestedPrice: getRandomPrice(productInfo.category, productInfo.condition),
        marketHigh: getRandomPrice(productInfo.category, 'new'),
        marketLow: getRandomPrice(productInfo.category, 'fair') * 0.8,
        averagePrice: getRandomPrice(productInfo.category, 'good'),
        condition: productInfo.condition,
        confidence: Math.floor(Math.random() * 15) + 85 // 85-99%
      };
      
      setPricingResult(result);
    }, 2000);
  };
  
  // Helper function to generate realistic prices based on category and condition
  const getRandomPrice = (category: string, condition: string) => {
    let basePrice = 0;
    
    switch (category) {
      case 'smartphone':
        basePrice = 65000;
        break;
      case 'laptop':
        basePrice = 85000;
        break;
      case 'tablet':
        basePrice = 45000;
        break;
      case 'camera':
        basePrice = 55000;
        break;
      case 'audio':
        basePrice = 25000;
        break;
      default:
        basePrice = 35000;
    }
    
    // Adjust based on condition
    let multiplier = 1;
    switch (condition) {
      case 'new':
        multiplier = 1;
        break;
      case 'like-new':
        multiplier = 0.9;
        break;
      case 'excellent':
        multiplier = 0.8;
        break;
      case 'good':
        multiplier = 0.7;
        break;
      case 'fair':
        multiplier = 0.6;
        break;
      default:
        multiplier = 0.7;
    }
    
    // Add some randomness
    const randomFactor = 0.9 + Math.random() * 0.2; // 0.9-1.1
    
    return Math.round(basePrice * multiplier * randomFactor);
  };
  
  const resetForm = () => {
    setProductInfo({
      category: '',
      brand: '',
      model: '',
      age: '',
      condition: ''
    });
    setPricingResult(null);
    setStep(1);
  };
  
  return (
    <section className="section-container bg-gradient-to-br from-accent/5 to-transparent rounded-3xl">
      <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-10 md:space-y-0">
        <div className="md:w-1/2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
            <BarChart3 size={14} className="mr-1" />
            <span>AI-Powered Smart Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get the Best Value for Your Electronics
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Our AI analyzes market data, device condition, and demand trends to recommend 
            the perfect price for your electronic devices. Sell faster and at fair prices, every time.
          </p>
          
          <div className="flex flex-col space-y-4">
            {[
              { title: "Real-Time Market Analysis", description: "Compare with current market rates" },
              { title: "Condition-Based Valuation", description: "Precise pricing based on actual condition" },
              { title: "Fair Price Guarantee", description: "Balanced recommendations for buyers and sellers" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="mt-1 p-1 rounded-full bg-accent/10">
                  <Check size={16} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 w-full">
          <Card className="glass overflow-hidden">
            <CardContent className="p-0">
              {step === 1 && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">What are you selling?</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productInfo.category}
                          onValueChange={(value) => handleInputChange('category', value)}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smartphone">Smartphone</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="camera">Camera</SelectItem>
                            <SelectItem value="audio">Audio Device</SelectItem>
                            <SelectItem value="wearable">Wearable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Select
                          value={productInfo.brand}
                          onValueChange={(value) => handleInputChange('brand', value)}
                        >
                          <SelectTrigger id="brand">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="samsung">Samsung</SelectItem>
                            <SelectItem value="sony">Sony</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="lg">LG</SelectItem>
                            <SelectItem value="microsoft">Microsoft</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g. iPhone 13 Pro Max, MacBook Air M1"
                        value={productInfo.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Device Age</Label>
                        <Select
                          value={productInfo.age}
                          onValueChange={(value) => handleInputChange('age', value)}
                        >
                          <SelectTrigger id="age">
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Brand New</SelectItem>
                            <SelectItem value="1">Less than 1 year</SelectItem>
                            <SelectItem value="2">1-2 years</SelectItem>
                            <SelectItem value="3">2-3 years</SelectItem>
                            <SelectItem value="4">3-4 years</SelectItem>
                            <SelectItem value="5">4+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={productInfo.condition}
                          onValueChange={(value) => handleInputChange('condition', value)}
                        >
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New / Open Box</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={calculatePrice}
                    disabled={!productInfo.category || !productInfo.brand || !productInfo.model || !productInfo.age || !productInfo.condition || isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <div className="h-4 w-4 border-2 border-t-accent border-r-accent/30 border-b-accent/10 border-l-accent/50 rounded-full animate-spin mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        Get AI Price Suggestion
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {step === 2 && pricingResult && (
                <div>
                  <div className="bg-accent text-white p-6 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                      <Cpu size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">AI-Suggested Price</h3>
                    <div className="text-4xl font-bold mb-2">
                      ₹{pricingResult.suggestedPrice.toLocaleString()}
                    </div>
                    <p className="text-white/80">
                      {pricingResult.confidence}% confidence based on market analysis
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <Tabs defaultValue="overview">
                      <TabsList className="w-full">
                        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                        <TabsTrigger value="details" className="flex-1">Market Details</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="mt-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Condition</span>
                            <span className="capitalize">{pricingResult.condition}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Market Average</span>
                            <span>₹{pricingResult.averagePrice.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Price Range</span>
                            <span>₹{pricingResult.marketLow.toLocaleString()} - ₹{pricingResult.marketHigh.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Suggested Price</span>
                            <span className="font-bold text-accent">₹{pricingResult.suggestedPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                          <Button variant="outline" onClick={resetForm}>
                            Price Another Item
                          </Button>
                          <Button>
                            List For This Price
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="mt-4">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">Market Analysis</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Based on {Math.floor(Math.random() * 200) + 50} similar items sold in the last 30 days.
                            </p>
                            
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                                style={{ width: '100%' }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>₹{pricingResult.marketLow.toLocaleString()}</span>
                              <span>₹{pricingResult.averagePrice.toLocaleString()}</span>
                              <span>₹{pricingResult.marketHigh.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Low</span>
                              <span>Average</span>
                              <span>High</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Why This Price?</h4>
                            <p className="text-sm text-muted-foreground">
                              Our AI analyzed your device's condition, age, brand reputation, 
                              current market demand, and recent sales data to calculate a fair 
                              price that balances fast selling time with maximum value.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Selling Tips</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li className="flex items-start">
                                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                                <span>Include all accessories and original packaging if available</span>
                              </li>
                              <li className="flex items-start">
                                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                                <span>Take clear photos showing any wear or damage</span>
                              </li>
                              <li className="flex items-start">
                                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                                <span>Highlight unique features or upgrades of your device</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                          <Button variant="outline" onClick={resetForm}>
                            Price Another Item
                          </Button>
                          <Button>
                            List For This Price
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SmartPricing;

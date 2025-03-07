import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  ShieldCheck, 
  Lightbulb, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const Sell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    images: [],
    askingPrice: '',
    isVerified: false,
  });
  const [messages, setMessages] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [aiVerificationResults, setAiVerificationResults] = useState(null);
  const [marketInsights, setMarketInsights] = useState(null);
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [pricingFeedback, setPricingFeedback] = useState('');
  
  const categories = [
    'smartphones',
    'laptops',
    'tablets',
    'audio',
    'wearables',
    'cameras',
    'tvs',
    'speakers',
    'gaming'
  ];
  
  const conditions = [
    'new',
    'like-new',
    'good',
    'fair'
  ];

  const handleAIVerification = () => {
    if (currentStep !== 2) return;
    
    setIsVerifying(true);
    
    // Simulate AI verification process
    setTimeout(() => {
      // Set AI verification results
      const aiResults = {
        condition: 'like-new',
        recommendedPrice: Math.round(parseFloat(productData.askingPrice || '0') * 0.9), // Convert to number
        issues: [],
        confidenceScore: 97,
      };
      
      setAiVerificationResults(aiResults);
      setIsVerifying(false);
      
      // Update product data with AI verification results
      setProductData(prev => ({
        ...prev,
        condition: aiResults.condition,
        isVerified: true,
      }));
      
      // If there are no images uploaded, add a simulated message
      if (!productData.images || productData.images.length === 0) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: "Our AI system needs at least 3 clear images of your device to complete verification.",
            type: 'ai'
          }
        ]);
      }
    }, 3000);
  };
  
  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => URL.createObjectURL(file))]
    }));
  };
  
  const removeImage = (indexToRemove) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const generateSmartPricingInsights = () => {
    if (productData.category && productData.condition) {
      let marketData = {
        average: 0,
        high: 0,
        low: 0,
        recommendation: 0,
        recentSales: []
      };
      
      // Sample market data based on category
      if (productData.category === 'smartphones') {
        marketData = {
          average: 45000,
          high: 55000,
          low: 38000,
          recommendation: 49000,
          recentSales: [
            { price: 44000, date: '3 days ago' },
            { price: 47000, date: '1 week ago' },
            { price: 51000, date: '2 weeks ago' }
          ]
        };
      } else if (productData.category === 'laptops') {
        marketData = {
          average: 75000,
          high: 85000,
          low: 65000,
          recommendation: 79000,
          recentSales: [
            { price: 72000, date: '5 days ago' },
            { price: 80000, date: '1 week ago' },
            { price: 76000, date: '10 days ago' }
          ]
        };
      }
      
      // Calculate suggested price - fixing the type issue by ensuring we're working with numbers
      const basePrice = parseFloat(productData.askingPrice || '0');
      let suggestedPrice;
      
      if (basePrice > 0) {
        // If user has entered a price, provide recommendations relative to their price
        if (basePrice < marketData.low) {
          suggestedPrice = marketData.low;
          setPricingFeedback(`Your price is below market average. Consider increasing to at least ₹${marketData.low.toLocaleString()}`);
        } else if (basePrice > marketData.high) {
          suggestedPrice = marketData.high;
          setPricingFeedback(`Your price is above market average. Consider reducing to around ₹${marketData.high.toLocaleString()} for faster sale`);
        } else {
          suggestedPrice = basePrice;
          setPricingFeedback('Your price is within market range. Good choice!');
        }
      } else {
        // If no price entered, suggest the recommendation
        suggestedPrice = marketData.recommendation;
        setPricingFeedback(`Based on current market trends, we recommend pricing at ₹${marketData.recommendation.toLocaleString()}`);
      }
      
      setMarketInsights(marketData);
      setSuggestedPrice(suggestedPrice);
    }
  };
  
  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Product Title</Label>
        <Input 
          type="text" 
          id="title" 
          name="title" 
          value={productData.title} 
          onChange={handleChange} 
          placeholder="e.g., iPhone 13 Pro Max" 
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select 
          id="category" 
          name="category" 
          value={productData.category} 
          onChange={handleChange} 
          className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="condition">Condition</Label>
        <select 
          id="condition" 
          name="condition" 
          value={productData.condition} 
          onChange={handleChange}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select condition</option>
          {conditions.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={productData.description} 
          onChange={handleChange} 
          placeholder="Describe your product in detail" 
        />
      </div>
    </div>
  );
  
  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label>Upload Images</Label>
        <div className="flex space-x-4">
          <input 
            type="file" 
            id="imageUpload" 
            multiple 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden" 
          />
          <Label htmlFor="imageUpload" className="flex items-center space-x-2 cursor-pointer rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Upload size={16} />
            <span>Upload Images</span>
          </Label>
        </div>
        <div className="flex space-x-2 mt-2 overflow-x-auto">
          {productData.images.map((image, index) => (
            <div key={index} className="relative w-32 h-32 rounded-md overflow-hidden">
              <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-full object-cover" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1 right-1 bg-secondary/50 hover:bg-secondary text-white rounded-full"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="askingPrice">Asking Price (₹)</Label>
        <Input 
          type="number" 
          id="askingPrice" 
          name="askingPrice" 
          value={productData.askingPrice} 
          onChange={handleChange} 
          placeholder="Enter your price" 
        />
      </div>
      
      <Button 
        onClick={handleAIVerification} 
        disabled={isVerifying}
        className="w-full"
      >
        {isVerifying ? (
          <>
            Verifying with AI...
            <Progress className="mt-2" value={66} />
          </>
        ) : (
          <>
            <ShieldCheck size={16} className="mr-2" />
            Verify with AI
          </>
        )}
      </Button>
      
      {aiVerificationResults && (
        <div className="mt-4 p-4 rounded-md bg-accent/5 border border-accent/10">
          <h4 className="font-semibold">AI Verification Results</h4>
          <p className="text-sm text-muted-foreground">
            Condition: {aiVerificationResults.condition}
          </p>
          <p className="text-sm text-muted-foreground">
            Recommended Price: ₹{aiVerificationResults.recommendedPrice}
          </p>
          {aiVerificationResults.issues.length > 0 ? (
            <>
              <p className="text-sm font-medium mt-2">
                <AlertTriangle size={14} className="inline-block mr-1" />
                Issues Detected:
              </p>
              <ul>
                {aiVerificationResults.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    - {issue}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-green-500 mt-2">
              <CheckCircle size={14} className="inline-block mr-1" />
              No issues detected by AI
            </p>
          )}
        </div>
      )}
      
      {messages.length > 0 && (
        <div className="mt-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`p-3 rounded-md ${message.type === 'ai' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-green-500/10 border border-green-500/20'} mb-2`}
            >
              {message.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const renderStep3 = () => (
    <div className="space-y-4">
      <Button 
        onClick={generateSmartPricingInsights}
        className="w-full"
      >
        <Lightbulb size={16} className="mr-2" />
        Generate Smart Pricing Insights
      </Button>
      
      {marketInsights && (
        <div className="mt-4 p-4 rounded-md bg-accent/5 border border-accent/10">
          <h4 className="font-semibold">Market Insights</h4>
          <p className="text-sm text-muted-foreground">
            Average Price: ₹{marketInsights.average.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            High: ₹{marketInsights.high.toLocaleString()}, Low: ₹{marketInsights.low.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Recommended Price: ₹{marketInsights.recommendation.toLocaleString()}
          </p>
          
          <h5 className="font-medium mt-3">Recent Sales</h5>
          <ul>
            {marketInsights.recentSales.map((sale, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                ₹{sale.price.toLocaleString()} - {sale.date}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {suggestedPrice && (
        <div className="mt-4 p-4 rounded-md bg-green-500/5 border border-green-500/10">
          <h4 className="font-semibold">Suggested Price</h4>
          <p className="text-xl font-bold">₹{suggestedPrice.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{pricingFeedback}</p>
        </div>
      )}
    </div>
  );
  
  const renderConfirmation = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Confirm Your Listing</h3>
      <p>Please review the details below before submitting your listing.</p>
      
      <div className="p-4 rounded-md bg-secondary/50">
        <h4 className="font-medium">Product Details</h4>
        <p>Title: {productData.title}</p>
        <p>Category: {productData.category}</p>
        <p>Condition: {productData.condition}</p>
        <p>Description: {productData.description}</p>
        <p>Asking Price: ₹{productData.askingPrice}</p>
        {productData.isVerified && (
          <Badge variant="outline" className="mt-2">
            <ShieldCheck size={14} className="mr-1" />
            AI Verified
          </Badge>
        )}
      </div>
      
      <Button className="w-full">
        List Your Product
      </Button>
    </div>
  );
  
  const renderSteps = () => (
    <div className="flex justify-between mb-6">
      <div className={`w-1/4 text-center ${currentStep === 1 ? 'font-bold text-accent' : 'text-muted-foreground'}`}>
        1. Details
      </div>
      <div className={`w-1/4 text-center ${currentStep === 2 ? 'font-bold text-accent' : 'text-muted-foreground'}`}>
        2. Verify
      </div>
      <div className={`w-1/4 text-center ${currentStep === 3 ? 'font-bold text-accent' : 'text-muted-foreground'}`}>
        3. Price
      </div>
      <div className={`w-1/4 text-center ${currentStep === 4 ? 'font-bold text-accent' : 'text-muted-foreground'}`}>
        4. Confirm
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Sell Your Electronics</h1>
          
          {renderSteps()}
          
          <div className="glass rounded-xl p-8 md:p-12 border border-white/20 backdrop-blur-lg shadow-xl">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderConfirmation()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;

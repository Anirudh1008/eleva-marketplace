
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  DollarSign, 
  ChevronRight,
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch,
  CircleX
} from 'lucide-react';

const Sell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    category: '',
    brand: '',
    model: '',
    condition: '',
    purchaseDate: '',
    usageDuration: '',
    accessories: '',
    description: ''
  });
  const [uploadedMedia, setUploadedMedia] = useState({
    images: [] as File[],
    video: null as File | null,
    audio: null as File | null
  });
  const [aiAnalysis, setAiAnalysis] = useState({
    verificationScore: 0,
    suggestedCondition: '',
    authenticityScore: 0,
    functionalityScore: 0
  });
  const [price, setPrice] = useState({
    sellerPrice: '',
    aiSuggestedPrice: 0,
    marketAverage: 0,
    priceConfidence: 0
  });
  const [listingComplete, setListingComplete] = useState(false);

  const handleProductDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setUploadedMedia({
        ...uploadedMedia,
        images: [...uploadedMedia.images, ...newImages]
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedMedia({
        ...uploadedMedia,
        video: e.target.files[0]
      });
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedMedia({
        ...uploadedMedia,
        audio: e.target.files[0]
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...uploadedMedia.images];
    updatedImages.splice(index, 1);
    setUploadedMedia({
      ...uploadedMedia,
      images: updatedImages
    });
  };

  const handleRemoveVideo = () => {
    setUploadedMedia({
      ...uploadedMedia,
      video: null
    });
  };

  const handleRemoveAudio = () => {
    setUploadedMedia({
      ...uploadedMedia,
      audio: null
    });
  };

  const runAiAnalysis = () => {
    setLoading(true);
    
    // Simulate AI analysis after a delay
    setTimeout(() => {
      // Mock AI analysis results
      setAiAnalysis({
        verificationScore: Math.floor(Math.random() * 30) + 70, // 70-99
        suggestedCondition: ['Like New', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
        authenticityScore: Math.floor(Math.random() * 20) + 80, // 80-99
        functionalityScore: Math.floor(Math.random() * 25) + 75 // 75-99
      });
      
      // Generate mock pricing data based on product details
      const basePrice = productDetails.category === 'Smartphone' ? 500 : 
                        productDetails.category === 'Laptop' ? 800 : 200;
      
      const condition = productDetails.condition === 'Like New' ? 0.9 : 
                         productDetails.condition === 'Good' ? 0.7 : 0.5;
      
      const suggestedPrice = Math.round(basePrice * condition * (Math.random() * 0.4 + 0.8) * 100) / 100;
      
      setPrice({
        sellerPrice: '',
        aiSuggestedPrice: suggestedPrice,
        marketAverage: Math.round(suggestedPrice * (Math.random() * 0.3 + 0.9) * 100) / 100,
        priceConfidence: Math.floor(Math.random() * 30) + 70
      });
      
      setLoading(false);
      setCurrentStep(3);
      
      toast({
        title: "AI Verification Complete",
        description: `Your product has been analyzed with a verification score of ${aiAnalysis.verificationScore}%`,
      });
    }, 2000);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      sellerPrice: e.target.value
    });
  };

  const getPriceRecommendation = () => {
    const sellerPriceNum = parseFloat(price.sellerPrice);
    if (isNaN(sellerPriceNum)) return '';
    
    if (sellerPriceNum > price.aiSuggestedPrice * 1.2) {
      return "Your price is significantly higher than our AI suggestion. Consider lowering for faster sale.";
    } else if (sellerPriceNum < price.aiSuggestedPrice * 0.8) {
      return "Your price is significantly lower than market value. Consider a higher price.";
    } else {
      return "Your price is within the fair market range. Good choice!";
    }
  };

  const completeListing = () => {
    setLoading(true);
    
    // Simulate publishing delay
    setTimeout(() => {
      setListingComplete(true);
      setLoading(false);
      setCurrentStep(4);
      
      toast({
        title: "Listing Published Successfully!",
        description: "Your product is now live. You'll be notified when buyers show interest.",
      });
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category*</label>
                <select 
                  name="category" 
                  value={productDetails.category} 
                  onChange={handleProductDetailsChange} 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Smartwatch">Smartwatch</option>
                  <option value="Camera">Camera</option>
                  <option value="Gaming Console">Gaming Console</option>
                  <option value="TV">TV</option>
                  <option value="Speaker">Speaker</option>
                  <option value="Other Accessories">Other Accessories</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brand*</label>
                  <input 
                    type="text" 
                    name="brand" 
                    value={productDetails.brand} 
                    onChange={handleProductDetailsChange} 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g. Apple, Samsung, Dell"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Model*</label>
                  <input 
                    type="text" 
                    name="model" 
                    value={productDetails.model} 
                    onChange={handleProductDetailsChange} 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g. iPhone 13 Pro, Galaxy S22"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Condition*</label>
                <select 
                  name="condition" 
                  value={productDetails.condition} 
                  onChange={handleProductDetailsChange} 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Purchase Date</label>
                  <input 
                    type="date" 
                    name="purchaseDate" 
                    value={productDetails.purchaseDate} 
                    onChange={handleProductDetailsChange} 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Usage Duration</label>
                  <input 
                    type="text" 
                    name="usageDuration" 
                    value={productDetails.usageDuration} 
                    onChange={handleProductDetailsChange} 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g. 6 months, 2 years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Accessories Included</label>
                <input 
                  type="text" 
                  name="accessories" 
                  value={productDetails.accessories} 
                  onChange={handleProductDetailsChange} 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="e.g. Charger, Original Box, Headphones"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Product Description</label>
                <textarea 
                  name="description" 
                  value={productDetails.description} 
                  onChange={handleProductDetailsChange} 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent h-24"
                  placeholder="Describe your product's condition, features, and any relevant information"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setCurrentStep(2)} 
                disabled={!productDetails.category || !productDetails.brand || !productDetails.model || !productDetails.condition}
              >
                Continue to Media Upload
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Images (Required)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {uploadedMedia.images.map((image, index) => (
                      <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Product ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <CircleX size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {uploadedMedia.images.length < 5 && (
                      <label className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <Camera size={20} className="mb-1" />
                        <span className="text-xs">Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Upload at least 3 images (front, back, sides). Max 5 images.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Video (Optional but Recommended)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {uploadedMedia.video ? (
                    <div className="relative border rounded-md p-3 mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          <Upload size={20} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{uploadedMedia.video.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedMedia.video.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={handleRemoveVideo}
                          className="text-red-500 hover:text-red-700"
                        >
                          <CircleX size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                        <Upload size={24} className="text-accent" />
                      </div>
                      <p className="font-medium">Upload Product Video</p>
                      <p className="text-xs text-muted-foreground mt-1 mb-2">
                        Show your product's functionality and condition
                      </p>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                      <Button variant="outline" size="sm">
                        Select Video
                      </Button>
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">Upload a short video (max 30 seconds) showing the product working.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sound Check (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {uploadedMedia.audio ? (
                    <div className="relative border rounded-md p-3 mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          <Upload size={20} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{uploadedMedia.audio.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedMedia.audio.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={handleRemoveAudio}
                          className="text-red-500 hover:text-red-700"
                        >
                          <CircleX size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                        <Upload size={24} className="text-accent" />
                      </div>
                      <p className="font-medium">Upload Sound Sample</p>
                      <p className="text-xs text-muted-foreground mt-1 mb-2">
                        AI will analyze for speaker/microphone defects
                      </p>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleAudioUpload}
                      />
                      <Button variant="outline" size="sm">
                        Select Audio
                      </Button>
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">Upload a sound sample to verify speakers/microphone functionality.</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button 
                onClick={runAiAnalysis} 
                disabled={uploadedMedia.images.length < 1 || loading}
              >
                {loading ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    Run AI Verification
                    <ChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Verification Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 size={24} className="text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{aiAnalysis.verificationScore}%</div>
                    <div className="text-sm text-green-800">Verification Score</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100 flex flex-col items-center justify-center">
                    <Badge className="mb-2" variant="outline">{aiAnalysis.suggestedCondition}</Badge>
                    <div className="text-sm text-blue-800">AI-Suggested Condition</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                    <div className="text-xs text-purple-800 mb-1">Authentication</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${aiAnalysis.authenticityScore}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-purple-800">{aiAnalysis.authenticityScore}%</div>
                    
                    <div className="text-xs text-purple-800 mb-1 mt-2">Functionality</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${aiAnalysis.functionalityScore}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-purple-800">{aiAnalysis.functionalityScore}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Set Your Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Price (₹)*</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={16} className="text-gray-400" />
                        </div>
                        <input 
                          type="number" 
                          value={price.sellerPrice} 
                          onChange={handlePriceChange} 
                          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="Enter your price"
                          required
                        />
                      </div>
                    </div>
                    
                    {price.sellerPrice && (
                      <div className="bg-gray-50 p-3 rounded-md border">
                        <p className="text-sm">{getPriceRecommendation()}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-3">AI Price Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>AI Suggested Price:</span>
                        <span className="font-semibold">₹{price.aiSuggestedPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Market Average:</span>
                        <span className="font-semibold">₹{price.marketAverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Confidence:</span>
                        <span className="font-semibold">{price.priceConfidence}%</span>
                      </div>
                      <div className="pt-2 text-xs text-muted-foreground">
                        Based on {Math.floor(Math.random() * 50) + 20} similar listings and market trends
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button 
                onClick={completeListing}
                disabled={!price.sellerPrice || loading}
              >
                {loading ? (
                  <>Publishing...</>
                ) : (
                  <>
                    Complete Listing
                    <ChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Listing Published!</h2>
            <p className="text-muted-foreground mb-6">
              Your product is now live on the marketplace.
              You'll receive notifications when buyers express interest.
            </p>
            
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 border mb-6">
              <div className="flex items-start mb-4">
                {uploadedMedia.images.length > 0 && (
                  <img 
                    src={URL.createObjectURL(uploadedMedia.images[0])} 
                    alt="Product" 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                )}
                <div>
                  <h3 className="font-medium">
                    {productDetails.brand} {productDetails.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetails.category} • {aiAnalysis.suggestedCondition}
                  </p>
                  <div className="mt-1 text-lg font-bold">
                    ₹{price.sellerPrice}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2">{aiAnalysis.verificationScore}% Verified</Badge>
                <span>Listed just now</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/shop'}>
                Go to Shop
              </Button>
              <Button onClick={() => {
                setCurrentStep(1);
                setProductDetails({
                  category: '',
                  brand: '',
                  model: '',
                  condition: '',
                  purchaseDate: '',
                  usageDuration: '',
                  accessories: '',
                  description: ''
                });
                setUploadedMedia({
                  images: [],
                  video: null,
                  audio: null
                });
                setListingComplete(false);
                setPrice({
                  sellerPrice: '',
                  aiSuggestedPrice: 0,
                  marketAverage: 0,
                  priceConfidence: 0
                });
              }}>
                Sell Another Item
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {!listingComplete && (
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Sell Your Device</h1>
                
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 1 ? 'bg-accent text-white' : 'bg-gray-200'
                      }`}
                    >
                      1
                    </div>
                    <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 2 ? 'bg-accent text-white' : 'bg-gray-200'
                      }`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 3 ? 'bg-accent text-white' : 'bg-gray-200'
                      }`}
                    >
                      3
                    </div>
                    <div className={`h-1 w-16 ${currentStep >= 4 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= 4 ? 'bg-accent text-white' : 'bg-gray-200'
                      }`}
                    >
                      4
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">
                    {currentStep === 1 && "Enter Product Details"}
                    {currentStep === 2 && "Upload Media for AI Verification"}
                    {currentStep === 3 && "Set Your Price"}
                    {currentStep === 4 && "Listing Complete"}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentStep === 1 && "Tell us about your device to get started."}
                    {currentStep === 2 && "Upload photos, videos, and audio for our AI to verify your product."}
                    {currentStep === 3 && "Set your price based on our AI suggestion and market insights."}
                    {currentStep === 4 && "Your product listing is now live on the marketplace."}
                  </p>
                </div>
              </div>
            )}
            
            {renderStepContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;

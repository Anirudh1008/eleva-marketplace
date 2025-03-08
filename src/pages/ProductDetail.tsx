
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ShieldCheck, 
  IndianRupee, 
  MessageCircle, 
  Video, 
  ChevronRight,
  Heart,
  Share2,
  ArrowLeft,
  ArrowRight,
  X,
  Calendar,
  Cpu,
  BarChart4,
  RefreshCcw,
  Lock,
  Bot
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the Product type
interface ProductDetails {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  condition: string;
  rating: number;
  image: string;
  isVerified: boolean;
  category: string;
  description: string;
  specifications: Record<string, string>;
  sellerInfo: {
    name: string;
    rating: number;
    listings: number;
    response: string;
  };
  verificationDetails: {
    verified: boolean;
    date: string;
    score: number;
    issues: string[];
  };
  images: string[];
  videos?: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLiveRequestModalOpen, setIsLiveRequestModalOpen] = useState(false);
  
  // This would normally come from an API call using the ID
  const product: ProductDetails = location.state?.product || {
    id: id || '',
    title: "iPhone 13 Pro - Graphite",
    price: 699,
    originalPrice: 999,
    condition: "like-new",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop",
    isVerified: true,
    category: "Smartphones",
    description: "This iPhone 13 Pro is in excellent condition with minimal signs of use. The battery health is at 92%, and all features work perfectly. Comes with original charger and box.",
    specifications: {
      processor: "A15 Bionic",
      ram: "6GB",
      storage: "128GB",
      display: "6.1-inch Super Retina XDR",
      camera: "Pro 12MP camera system",
      battery: "Up to 22 hours video playback"
    },
    sellerInfo: {
      name: "Rahul Sharma",
      rating: 4.9,
      listings: 12,
      response: "Usually responds within 2 hours"
    },
    verificationDetails: {
      verified: true,
      date: "2023-10-15",
      score: 97,
      issues: []
    },
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1528&auto=format&fit=crop"
    ],
    videos: [
      "https://player.vimeo.com/external/645866574.sd.mp4?s=5aabca5e4ae28fbca43e8b3b1e5869e80fc18cdb&profile_id=165&oauth_token_id=57447761"
    ]
  };
  
  // Convert USD to INR
  const priceInRupees = Math.round(product.price * 83);
  const originalPriceInRupees = product.originalPrice ? Math.round(product.originalPrice * 83) : undefined;
  
  const getConditionColor = (condition) => {
    switch(condition) {
      case 'new': return 'bg-green-500/15 text-green-600 border-green-200';
      case 'like-new': return 'bg-blue-500/15 text-blue-600 border-blue-200';
      case 'good': return 'bg-yellow-500/15 text-yellow-700 border-yellow-200';
      case 'fair': return 'bg-orange-500/15 text-orange-700 border-orange-200';
      default: return 'bg-gray-500/15 text-gray-700 border-gray-200';
    }
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  
  const handleMessageSeller = () => {
    toast({
      title: "Contact Request Sent",
      description: "Seller will be notified of your interest",
    });
  };
  
  const handleVideoCall = () => {
    setIsLiveRequestModalOpen(true);
  };
  
  const handleLiveVideoRequest = (date, time) => {
    toast({
      title: "Live Video Request Sent",
      description: `Your request for a live video demonstration on ${date} at ${time} has been sent to the seller.`,
    });
    setIsLiveRequestModalOpen(false);
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorite ? "This item has been removed from your favorites" : "This item has been added to your favorites",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link has been copied to clipboard",
    });
  };
  
  const handleBuyNow = () => {
    window.location.href = `/payment?productId=${product.id}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden glass border border-accent/10">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 glass-dark p-2 rounded-full"
                >
                  <ArrowLeft size={18} />
                </button>
                
                <button 
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 glass-dark p-2 rounded-full"
                >
                  <ArrowRight size={18} />
                </button>
                
                {product.isVerified && (
                  <div className="absolute top-3 right-3 glass-dark py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-lg">
                    <ShieldCheck size={15} className="text-accent" />
                    <span className="text-xs font-semibold">AI Verified</span>
                  </div>
                )}

                {product.videos && product.videos.length > 0 && (
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute bottom-3 right-3 glass-dark py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-lg hover:bg-accent hover:text-white transition-colors"
                  >
                    <Video size={15} />
                    <span className="text-xs font-semibold">Watch Video</span>
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeImageIndex 
                        ? 'border-accent shadow-md scale-105' 
                        : 'border-transparent opacity-80'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} thumbnail ${index+1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleVideoCall}
                >
                  <Video size={18} className="mr-1" />
                  Request Live Demo
                </Button>
                
                <Button
                  variant={isFavorite ? "destructive" : "outline"}
                  size="icon"
                  onClick={handleToggleFavorite}
                >
                  <Heart size={18} className={isFavorite ? "fill-white" : ""} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Badge variant="outline" className={`${getConditionColor(product.condition)} border`}>
                    {product.condition.replace('-', ' ')}
                  </Badge>
                  
                  <div className="flex bg-yellow-100 px-2 py-1 rounded-full items-center">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700 ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
                
                <div className="flex items-baseline space-x-3 mb-4">
                  <div className="flex items-center">
                    <IndianRupee size={18} className="mr-1" />
                    <span className="text-2xl font-bold">{priceInRupees.toLocaleString()}</span>
                  </div>
                  
                  {originalPriceInRupees && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{originalPriceInRupees.toLocaleString()}
                    </span>
                  )}
                  
                  {originalPriceInRupees && (
                    <Badge className="bg-accent">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6">{product.description}</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground uppercase">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seller Information</h3>
                <div className="glass rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{product.sellerInfo.name}</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {product.sellerInfo.rating} ★
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {product.sellerInfo.listings} listings • {product.sellerInfo.response}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleMessageSeller}
                  >
                    <MessageCircle size={18} className="mr-1" />
                    Message Seller
                  </Button>
                </div>
              </div>
              
              {product.verificationDetails.verified && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AI Verification</h3>
                  <div className="glass rounded-xl p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck size={18} className="text-green-600" />
                      <span className="font-medium text-green-600">Verified on {product.verificationDetails.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold">{product.verificationDetails.score}/100</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${product.verificationDetails.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {product.verificationDetails.issues.length > 0 ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Minor issues detected:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {product.verificationDetails.issues.map((issue, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <span>•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-sm text-green-600">
                        No issues detected. This product is in excellent condition.
                      </div>
                    )}
                    
                    <Link to="/ai-verification" className="text-accent text-sm flex items-center hover:underline">
                      Learn more about AI Verification
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Button size="lg" className="w-full text-lg" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-3">Recommended Accessories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "iPhone 13 Pro Silicone Case",
                      price: 1999,
                      image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1588&auto=format&fit=crop"
                    },
                    {
                      name: "MagSafe Charger",
                      price: 2499,
                      image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?q=80&w=1470&auto=format&fit=crop"
                    }
                  ].map((accessory, index) => (
                    <div key={index} className="glass rounded-lg overflow-hidden hover-shadow transition-all">
                      <div className="aspect-square overflow-hidden">
                        <img src={accessory.image} alt={accessory.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-medium">{accessory.name}</div>
                        <div className="flex items-center text-sm">
                          <IndianRupee size={12} />
                          <span>{accessory.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced AI Feature Recommendations */}
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6">AI-Powered Features & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link to="/ai-verification" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-full mr-3">
                    <ShieldCheck className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold">AI Verification</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Authenticate and verify product condition using our advanced AI technology.
                </p>
              </Link>
              
              <Link to="/smart-pricing" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-full mr-3">
                    <BarChart4 className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold">Smart Pricing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered pricing analysis and market trend insights for better deals.
                </p>
              </Link>
              
              <Link to="/instant-comparison" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-full mr-3">
                    <ArrowLeft className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold">Instant Comparison</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compare new vs. used alternatives to make data-driven purchase decisions.
                </p>
              </Link>
              
              <Link to="/swap-trade" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-full mr-3">
                    <RefreshCcw className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold">Swap & Trade</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trade your device using our AI-powered matching system for fair exchanges.
                </p>
              </Link>
              
              <Link to="/ai-fraud-detection" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-full mr-3">
                    <Lock className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold">Fraud Detection</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI system prevents scams and verifies that products aren't stolen.
                </p>
              </Link>
            </div>
          </div>
          
          {/* Verified Sellers & AI Protection Section */}
          <div className="my-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Verified Sellers & AI Protection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our marketplace ensures safe transactions and provides comprehensive protection for all users.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass bg-white/80 rounded-xl p-6 border border-accent/10 relative overflow-hidden">
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-4 py-1 rotate-12 text-xs font-bold">
                  30% OFF
                </div>
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-full bg-accent/10 mr-4">
                    <ShieldCheck className="text-accent h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">AI-Verified Badge</h3>
                    <p className="text-sm text-muted-foreground">
                      Get your products verified by our AI system at a special discounted rate and boost buyer confidence.
                    </p>
                  </div>
                </div>
                <Link to="/ai-verification">
                  <Button variant="outline" className="w-full">Get Verified</Button>
                </Link>
              </div>
              
              <div className="glass bg-white/80 rounded-xl p-6 border border-accent/10">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <Lock className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">AI Money Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      Our escrow payment system ensures your money is protected until you receive and verify the product.
                    </p>
                  </div>
                </div>
                <Link to="/payment-protection">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </div>
              
              <div className="glass bg-white/80 rounded-xl p-6 border border-accent/10">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <BarChart4 className="text-purple-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Boost Listings</h3>
                    <p className="text-sm text-muted-foreground">
                      Increase your product visibility with our AI-powered advertisement system to reach more potential buyers.
                    </p>
                  </div>
                </div>
                <Link to="/boost-listing">
                  <Button variant="outline" className="w-full">Boost Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Video</DialogTitle>
            <DialogDescription>
              Watch this video to see the product in action
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            {product.videos && product.videos.length > 0 && (
              <video 
                src={product.videos[0]} 
                controls 
                autoPlay 
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Live Demo Request Modal */}
      <Dialog open={isLiveRequestModalOpen} onOpenChange={setIsLiveRequestModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Live Product Demo</DialogTitle>
            <DialogDescription>
              Schedule a live video call with the seller to see the product in real-time
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>In 2 days</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>3:00 PM</option>
                  <option>6:00 PM</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea 
                className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[80px]"
                placeholder="Any specific details you want to see or questions you have..."
              ></textarea>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleLiveVideoRequest('Tomorrow', '3:00 PM')}
            >
              <Calendar className="mr-2 h-4 w-4" /> Schedule Live Demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

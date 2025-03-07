
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShieldCheck, Zap, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  rating: number;
  image: string;
  isVerified: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  // Convert USD to INR (83 is the approximate conversion rate)
  const priceInRupees = Math.round(product.price * 83);
  const originalPriceInRupees = product.originalPrice ? Math.round(product.originalPrice * 83) : undefined;
  
  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'new': return 'bg-green-500/15 text-green-600 border-green-200';
      case 'like-new': return 'bg-blue-500/15 text-blue-600 border-blue-200';
      case 'good': return 'bg-yellow-500/15 text-yellow-700 border-yellow-200';
      case 'fair': return 'bg-orange-500/15 text-orange-700 border-orange-200';
      default: return 'bg-gray-500/15 text-gray-700 border-gray-200';
    }
  };
  
  const getDiscountPercentage = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return discount > 0 ? discount : null;
  };
  
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast({
        title: "Added to Wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    } else {
      toast({
        title: "Removed from Wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    }
  };
  
  const discount = getDiscountPercentage();

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden glass transition-all duration-500 card-hover border border-accent/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image || '/placeholder.svg'} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <button 
        className={`absolute top-3 right-3 p-2 rounded-full ${
          isFavorite ? 'bg-red-500 text-white shadow-lg' : 'glass-dark'
        } transition-all duration-300 z-10 hover:scale-110`}
        onClick={handleToggleFavorite}
      >
        <Heart size={18} className={isFavorite ? 'fill-white' : ''} />
      </button>
      
      {product.isVerified && (
        <div className="absolute top-3 left-3 glass-dark py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-lg z-10">
          <ShieldCheck size={15} className="text-accent" />
          <span className="text-xs font-semibold">AI Verified</span>
        </div>
      )}
      
      {discount && (
        <div className="absolute top-14 left-3 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center">
          <Zap size={12} className="mr-1" />
          <span>{discount}% OFF</span>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-base line-clamp-1 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <IndianRupee size={16} className="mr-1" />
            <span className="font-bold text-lg">{priceInRupees.toLocaleString()}</span>
            {originalPriceInRupees && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ₹{originalPriceInRupees.toLocaleString()}
              </span>
            )}
          </div>
          
          <Badge variant="outline" className={`${getConditionColor(product.condition)} border`}>
            {product.condition.replace('-', ' ')}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex bg-yellow-100 px-2 py-1 rounded-full items-center">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700 ml-1">{product.rating.toFixed(1)}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-full"
            onClick={handleViewDetails}
          >
            Buy Now
          </Button>
        </div>
      </div>
      
      <div className={`
        absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
        flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      `}>
        <Button 
          onClick={handleViewDetails}
          className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

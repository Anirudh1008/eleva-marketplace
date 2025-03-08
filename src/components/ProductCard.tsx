
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Info, IndianRupee } from 'lucide-react';
import { Product } from './FeaturedProducts';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  
  // Convert USD to INR (83 is the approximate conversion rate)
  const priceInRupees = Math.round(product.price * 83);
  const originalPriceInRupees = product.originalPrice ? Math.round(product.originalPrice * 83) : undefined;
  
  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'new': return 'bg-green-500';
      case 'like-new': return 'bg-blue-500';
      case 'good': return 'bg-yellow-500';
      case 'fair': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getConditionText = (condition: string) => {
    switch(condition) {
      case 'new': return 'New';
      case 'like-new': return 'Like New';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      default: return condition;
    }
  };
  
  const getDiscountPercentage = () => {
    if (product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };
  
  const handleCardClick = () => {
    // Save product data to localStorage to access it on the product detail page
    try {
      localStorage.setItem('currentProductDetail', JSON.stringify(product));
    } catch (error) {
      console.error('Error saving product to localStorage:', error);
    }
    
    // Navigate to the product detail page with the product ID
    navigate(`/product/${product.id}`);
  };
  
  const discountPercentage = getDiscountPercentage();
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border border-accent/10 glass"
      onClick={handleCardClick}
    >
      <div className="relative pt-[56.25%] bg-secondary/20">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Condition badge */}
        <div className="absolute top-2 left-2">
          <Badge className={`${getConditionColor(product.condition)} text-white font-medium`}>
            {getConditionText(product.condition)}
          </Badge>
        </div>
        
        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white font-medium">
              {discountPercentage}% OFF
            </Badge>
          </div>
        )}
        
        {/* Verified badge */}
        {product.isVerified && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-accent text-white flex items-center space-x-1 shadow-md">
              <Shield size={12} />
              <span>AI Verified</span>
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 truncate">{product.title}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500 mr-2">
            <Star size={16} fill="currentColor" />
            <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <IndianRupee size={16} />
            <span className="font-bold text-lg">{priceInRupees.toLocaleString()}</span>
          </div>
          {product.originalPrice > product.price && (
            <span className="text-muted-foreground line-through text-sm">
              ₹{originalPriceInRupees?.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

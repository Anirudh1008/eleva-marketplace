
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShieldCheck } from 'lucide-react';

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
  
  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'new': return 'bg-green-500/10 text-green-500';
      case 'like-new': return 'bg-blue-500/10 text-blue-500';
      case 'good': return 'bg-yellow-500/10 text-yellow-600';
      case 'fair': return 'bg-orange-500/10 text-orange-600';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  const getDiscountPercentage = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return discount > 0 ? discount : null;
  };
  
  const discount = getDiscountPercentage();

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden glass card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image || '/placeholder.svg'} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
      
      <button 
        className={`absolute top-3 right-3 p-2 rounded-full ${
          isFavorite ? 'bg-red-500 text-white' : 'glass-dark'
        } transition-all duration-300`}
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
      >
        <Heart size={16} className={isFavorite ? 'fill-white' : ''} />
      </button>
      
      {product.isVerified && (
        <div className="absolute top-3 left-3 glass-dark py-1 px-2 rounded-full flex items-center space-x-1">
          <ShieldCheck size={14} className="text-accent" />
          <span className="text-xs font-medium">AI Verified</span>
        </div>
      )}
      
      {discount && (
        <div className="absolute bottom-[5.5rem] left-3 bg-accent/90 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base line-clamp-1">
            {product.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <Badge variant="outline" className={`${getConditionColor(product.condition)}`}>
            {product.condition.replace('-', ' ')}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating.toFixed(1)}</span>
          
          <span className="text-xs text-muted-foreground ml-auto">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className={`
        absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
        flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      `}>
        <button className="bg-white text-black font-medium py-2 px-4 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

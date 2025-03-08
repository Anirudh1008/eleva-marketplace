
import React from 'react';
import { Product } from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Heart, Trash, ShoppingCart, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface WishlistItemProps {
  product: Product;
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product, onRemove, onAddToCart }) => {
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
  
  const discount = getDiscountPercentage();

  return (
    <div className="flex border rounded-lg overflow-hidden glass hover:shadow-md transition-all duration-300">
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h3 className="font-medium text-sm sm:text-base line-clamp-1">{product.title}</h3>
            <Badge variant="outline" className={`${getConditionColor(product.condition)} text-xs`}>
              {product.condition.replace('-', ' ')}
            </Badge>
          </div>
          
          <div className="flex items-center mt-1">
            <IndianRupee size={14} className="mr-1" />
            <span className="font-bold">{priceInRupees.toLocaleString()}</span>
            {originalPriceInRupees && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                ₹{originalPriceInRupees.toLocaleString()}
              </span>
            )}
            {discount && (
              <span className="ml-2 text-xs text-green-600 font-medium">
                {discount}% off
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex-shrink-0">
            {product.isVerified && (
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent">
                AI Verified
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onRemove(product.id)}
            >
              <Trash size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs bg-accent/10 hover:bg-accent/20 text-accent"
              onClick={() => {
                onAddToCart(product);
                toast({
                  title: "Added to cart!",
                  description: `${product.title} has been added to your cart.`,
                });
              }}
            >
              <ShoppingCart size={14} className="mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;

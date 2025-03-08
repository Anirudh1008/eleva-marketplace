
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Link, useNavigate } from 'react-router-dom';

// Define the Product type
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  condition: "like-new" | "good" | "fair" | "new";
  rating: number;
  image: string;
  isVerified: boolean;
  category: string;
  description?: string;
  sellerInfo?: {
    name: string;
    rating: number;
    verified: boolean;
    sales: number;
  };
  aiVerification?: {
    authenticityScore: number;
    conditionScore: number;
    functionalityScore: number;
  };
  specs?: string[];
  videoUrl?: string;
}

interface FeaturedProductsProps {
  featuredProducts: Product[];
  newProducts: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  featuredProducts = [], 
  newProducts = [] 
}) => {
  const navigate = useNavigate();

  // Fallback to localStorage if props are empty
  const getFeaturedProducts = () => {
    if (featuredProducts.length > 0) return featuredProducts;
    
    try {
      const storedProducts = localStorage.getItem('featuredProducts');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error retrieving featuredProducts from localStorage:', error);
      return [];
    }
  };
  
  const getNewProducts = () => {
    if (newProducts.length > 0) return newProducts;
    
    try {
      const storedProducts = localStorage.getItem('newProducts');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error retrieving newProducts from localStorage:', error);
      return [];
    }
  };

  const displayedFeaturedProducts = getFeaturedProducts();
  const displayedNewProducts = getNewProducts();

  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Discover verified pre-owned electronics at great prices</p>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="text-accent">
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">The latest brand new electronics with full warranty</p>
            </div>
            <Link to="/shop?condition=new">
              <Button variant="ghost" className="text-accent">
                Explore New Products
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedNewProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-16 glass rounded-2xl p-8 border border-accent/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Compare New & Pre-Owned</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            See side-by-side comparisons of new vs. pre-owned electronics to make an informed decision based on price, condition, and features.
          </p>
          <Button 
            onClick={() => navigate('/compare')}
            className="px-8"
          >
            Compare Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

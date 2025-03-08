
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Link, useNavigate } from 'react-router-dom';

const featuredProducts = [
  {
    id: "1",
    title: "iPhone 13 Pro - Graphite",
    price: 699,
    originalPrice: 999,
    condition: "like-new" as const,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop",
    isVerified: true,
    category: "smartphones"
  },
  {
    id: "2",
    title: "MacBook Air M1 - Space Gray",
    price: 849,
    originalPrice: 999,
    condition: "good" as const,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop",
    isVerified: true,
    category: "laptops"
  },
  {
    id: "3",
    title: "Sony WH-1000XM4 Headphones",
    price: 249,
    originalPrice: 349,
    condition: "fair" as const,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop",
    isVerified: true,
    category: "audio"
  },
  {
    id: "4",
    title: "iPad Pro 12.9\" M1 Chip",
    price: 899,
    originalPrice: 1099,
    condition: "like-new" as const,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1374&auto=format&fit=crop",
    isVerified: true,
    category: "tablets"
  }
];

// New product listings for comparison
const newProducts = [
  {
    id: "n1",
    title: "iPhone 14 Pro - Alpine Blue",
    price: 999,
    originalPrice: 999,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1664478546384-d57e49cf5b3e?q=80&w=2070&auto=format&fit=crop",
    isVerified: true,
    category: "smartphones"
  },
  {
    id: "n2",
    title: "MacBook Pro M2 - Silver",
    price: 1299,
    originalPrice: 1299,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=1480&auto=format&fit=crop",
    isVerified: true,
    category: "laptops"
  },
  {
    id: "n3",
    title: "Sony WH-1000XM5 Headphones",
    price: 399,
    originalPrice: 399,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=2127&auto=format&fit=crop",
    isVerified: true,
    category: "audio"
  },
  {
    id: "n4",
    title: "iPad Pro 12.9\" M2 Chip",
    price: 1099,
    originalPrice: 1099,
    condition: "new" as const,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1623126908029-58c31ac7e48e?q=80&w=2070&auto=format&fit=crop",
    isVerified: true,
    category: "tablets"
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

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
          {featuredProducts.map((product, index) => (
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
            {newProducts.map((product, index) => (
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

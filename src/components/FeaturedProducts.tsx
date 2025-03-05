
import React from 'react';
import ProductCard, { Product } from './ProductCard';

const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Graphite',
    price: 699,
    originalPrice: 999,
    condition: 'like-new',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop',
    isVerified: true,
    category: 'Smartphones'
  },
  {
    id: '2',
    title: 'MacBook Air M1 - Space Gray',
    price: 849,
    originalPrice: 999,
    condition: 'good',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'Laptops'
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4 Headphones',
    price: 249,
    originalPrice: 349,
    condition: 'fair',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop',
    isVerified: true,
    category: 'Audio'
  },
  {
    id: '4',
    title: 'DJI Mini 3 Pro Drone',
    price: 599,
    originalPrice: 759,
    condition: 'good',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'Drones'
  },
  {
    id: '5',
    title: 'iPad Pro 12.9" M1 Chip',
    price: 899,
    originalPrice: 1099,
    condition: 'like-new',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1374&auto=format&fit=crop',
    isVerified: true,
    category: 'Tablets'
  },
  {
    id: '6',
    title: 'Samsung Galaxy S22 Ultra',
    price: 799,
    originalPrice: 1199,
    condition: 'good',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1659776680419-9d59ae0db230?q=80&w=1374&auto=format&fit=crop',
    isVerified: true,
    category: 'Smartphones'
  },
  {
    id: '7',
    title: 'Apple Watch Series 7',
    price: 299,
    originalPrice: 399,
    condition: 'like-new',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1444&auto=format&fit=crop',
    isVerified: true,
    category: 'Wearables'
  },
  {
    id: '8',
    title: 'Nintendo Switch OLED',
    price: 299,
    originalPrice: 349,
    condition: 'new',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1662997297569-a814ff20e480?q=80&w=1465&auto=format&fit=crop',
    isVerified: false,
    category: 'Gaming'
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="section-container">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Discover our top-rated and verified electronics</p>
        </div>
        <button className="hidden md:block link-underline text-accent font-medium">
          View All Products
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center md:hidden">
        <button className="link-underline text-accent font-medium">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;

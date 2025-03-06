import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  Camera,
  Tv,
  Speaker,
  Gamepad,
  Zap
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Products', icon: Zap },
  { id: 'smartphones', name: 'Smartphones', icon: Smartphone },
  { id: 'laptops', name: 'Laptops', icon: Laptop },
  { id: 'audio', name: 'Audio', icon: Headphones },
  { id: 'wearables', name: 'Wearables', icon: Watch },
  { id: 'tablets', name: 'Tablets', icon: Tablet },
  { id: 'cameras', name: 'Cameras', icon: Camera },
  { id: 'tvs', name: 'TVs', icon: Tv },
  { id: 'speakers', name: 'Speakers', icon: Speaker },
  { id: 'gaming', name: 'Gaming', icon: Gamepad },
];

const conditions = [
  { id: 'new', label: 'New' },
  { id: 'like-new', label: 'Like New' },
  { id: 'good', label: 'Good' },
  { id: 'fair', label: 'Fair' }
];

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under5000', label: 'Under ₹5,000' },
  { id: '5000-15000', label: '₹5,000 - ₹15,000' },
  { id: '15000-30000', label: '₹15,000 - ₹30,000' },
  { id: '30000-60000', label: '₹30,000 - ₹60,000' },
  { id: 'over60000', label: 'Over ₹60,000' }
];

type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  condition: "new" | "like-new" | "good" | "fair";
  rating: number;
  image: string;
  isVerified: boolean;
  category: string;
};

const allProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Graphite',
    price: 699,
    originalPrice: 999,
    condition: 'like-new' as "like-new",
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop',
    isVerified: true,
    category: 'smartphones'
  },
  {
    id: '2',
    title: 'MacBook Air M1 - Space Gray',
    price: 849,
    originalPrice: 999,
    condition: 'good' as "good",
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'laptops'
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4 Headphones',
    price: 249,
    originalPrice: 349,
    condition: 'fair' as "fair",
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop',
    isVerified: true,
    category: 'audio'
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
    category: 'cameras'
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
    category: 'tablets'
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
    category: 'smartphones'
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
    category: 'wearables'
  },
  {
    id: '8',
    title: 'Nintendo Switch OLED',
    price: 299,
    originalPrice: 349,
    condition: 'new' as "new",
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1662997297569-a814ff20e480?q=80&w=1465&auto=format&fit=crop',
    isVerified: false,
    category: 'gaming'
  },
  {
    id: '9',
    title: 'Sony PlayStation 5',
    price: 450,
    originalPrice: 499,
    condition: 'good',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'gaming'
  },
  {
    id: '10',
    title: 'Samsung 55" QLED 4K TV',
    price: 699,
    originalPrice: 899,
    condition: 'new',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1474&auto=format&fit=crop',
    isVerified: true,
    category: 'tvs'
  },
  {
    id: '11',
    title: 'Canon EOS R5 Mirrorless Camera',
    price: 3299,
    originalPrice: 3899,
    condition: 'new',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'cameras'
  },
  {
    id: '12',
    title: 'Bose SoundLink Revolve+ Speaker',
    price: 199,
    originalPrice: 299,
    condition: 'good',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1636&auto=format&fit=crop',
    isVerified: false,
    category: 'speakers'
  }
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState('relevance');
  
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedConditions, selectedPriceRange, sortBy]);
  
  const filterProducts = () => {
    let filtered = [...allProducts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(product => selectedConditions.includes(product.condition));
    }
    
    if (selectedPriceRange !== 'all') {
      const priceInRupees = (price: number) => Math.round(price * 83);
      
      switch (selectedPriceRange) {
        case 'under5000':
          filtered = filtered.filter(product => priceInRupees(product.price) < 5000);
          break;
        case '5000-15000':
          filtered = filtered.filter(product => {
            const price = priceInRupees(product.price);
            return price >= 5000 && price <= 15000;
          });
          break;
        case '15000-30000':
          filtered = filtered.filter(product => {
            const price = priceInRupees(product.price);
            return price > 15000 && price <= 30000;
          });
          break;
        case '30000-60000':
          filtered = filtered.filter(product => {
            const price = priceInRupees(product.price);
            return price > 30000 && price <= 60000;
          });
          break;
        case 'over60000':
          filtered = filtered.filter(product => priceInRupees(product.price) > 60000);
          break;
        default:
          break;
      }
    }
    
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }
    
    setProducts(filtered);
  };
  
  const handleConditionToggle = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedConditions([]);
    setSelectedPriceRange('all');
    setSortBy('relevance');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Shop Electronics</h1>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-secondary/50 rounded-lg border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-3 pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2.5 rounded-full transition-all ${
                      selectedCategory === category.id
                        ? 'bg-accent text-white shadow-md'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-full md:w-64 space-y-6">
              <div className="glass rounded-xl p-5 border border-accent/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-accent hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Condition</h4>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <label key={condition.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedConditions.includes(condition.id)}
                            onChange={() => handleConditionToggle(condition.id)}
                            className="rounded text-accent focus:ring-accent"
                          />
                          <span>{condition.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price-range"
                            checked={selectedPriceRange === range.id}
                            onChange={() => setSelectedPriceRange(range.id)}
                            className="text-accent focus:ring-accent"
                          />
                          <span>{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Verification</h4>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>AI Verified Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="md:hidden fixed inset-0 bg-background z-50 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-full hover:bg-secondary"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Category</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setShowFilters(false);
                            }}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                              selectedCategory === category.id
                                ? 'bg-accent text-white'
                                : 'bg-secondary/50'
                            }`}
                          >
                            <Icon size={16} />
                            <span>{category.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Condition</h4>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <label key={condition.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedConditions.includes(condition.id)}
                            onChange={() => handleConditionToggle(condition.id)}
                            className="rounded text-accent focus:ring-accent"
                          />
                          <span>{condition.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price-range"
                            checked={selectedPriceRange === range.id}
                            onChange={() => setSelectedPriceRange(range.id)}
                            className="text-accent focus:ring-accent"
                          />
                          <span>{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex flex-col space-y-3">
                    <Button onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        clearFilters();
                        setShowFilters(false);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex-1">
              {(selectedCategory !== 'all' || selectedConditions.length > 0 || selectedPriceRange !== 'all' || searchQuery) && (
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Active Filters:</span>
                  
                  {selectedCategory !== 'all' && (
                    <Badge 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {categories.find(c => c.id === selectedCategory)?.name}
                      <button 
                        onClick={() => setSelectedCategory('all')}
                        className="ml-1 hover:text-accent"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {selectedConditions.map(condition => (
                    <Badge 
                      key={condition} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {conditions.find(c => c.id === condition)?.label}
                      <button 
                        onClick={() => handleConditionToggle(condition)}
                        className="ml-1 hover:text-accent"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedPriceRange !== 'all' && (
                    <Badge 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {priceRanges.find(pr => pr.id === selectedPriceRange)?.label}
                      <button 
                        onClick={() => setSelectedPriceRange('all')}
                        className="ml-1 hover:text-accent"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {searchQuery && (
                    <Badge 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      Search: {searchQuery}
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="ml-1 hover:text-accent"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-accent hover:underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} {products.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <div 
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-xl p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;

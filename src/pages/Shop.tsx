
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, SlidersHorizontal, X, Cpu } from 'lucide-react';

// Sample products data
const allProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Graphite',
    price: 58117, // ₹58,117 (Converted from $699)
    originalPrice: 82917, // ₹82,917 (Converted from $999)
    condition: 'like-new',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1528&auto=format&fit=crop',
    isVerified: true,
    category: 'Smartphones'
  },
  {
    id: '2',
    title: 'MacBook Air M1 - Space Gray',
    price: 70467, // ₹70,467 (Converted from $849)
    originalPrice: 82917, // ₹82,917 (Converted from $999)
    condition: 'good',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'Laptops'
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4 Headphones',
    price: 20667, // ₹20,667 (Converted from $249)
    originalPrice: 28967, // ₹28,967 (Converted from $349)
    condition: 'fair',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop',
    isVerified: true,
    category: 'Audio'
  },
  {
    id: '4',
    title: 'DJI Mini 3 Pro Drone',
    price: 49717, // ₹49,717 (Converted from $599)
    originalPrice: 62997, // ₹62,997 (Converted from $759)
    condition: 'good',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'Drones'
  },
  {
    id: '5',
    title: 'iPad Pro 12.9" M1 Chip',
    price: 74617, // ₹74,617 (Converted from $899)
    originalPrice: 91217, // ₹91,217 (Converted from $1099)
    condition: 'like-new',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1374&auto=format&fit=crop',
    isVerified: true,
    category: 'Tablets'
  },
  {
    id: '6',
    title: 'Samsung Galaxy S22 Ultra',
    price: 66317, // ₹66,317 (Converted from $799)
    originalPrice: 99517, // ₹99,517 (Converted from $1199)
    condition: 'good',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1659776680419-9d59ae0db230?q=80&w=1374&auto=format&fit=crop',
    isVerified: true,
    category: 'Smartphones'
  },
  {
    id: '7',
    title: 'Apple Watch Series 7',
    price: 24817, // ₹24,817 (Converted from $299)
    originalPrice: 33117, // ₹33,117 (Converted from $399)
    condition: 'like-new',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1444&auto=format&fit=crop',
    isVerified: true,
    category: 'Wearables'
  },
  {
    id: '8',
    title: 'Nintendo Switch OLED',
    price: 24817, // ₹24,817 (Converted from $299)
    originalPrice: 28967, // ₹28,967 (Converted from $349)
    condition: 'new',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1662997297569-a814ff20e480?q=80&w=1465&auto=format&fit=crop',
    isVerified: false,
    category: 'Gaming'
  },
  {
    id: '9',
    title: 'Bose QuietComfort 45 Headphones',
    price: 24817, // ₹24,817 (Converted from $299)
    originalPrice: 31867, // ₹31,867 (Converted from $379)
    condition: 'good',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=1974&auto=format&fit=crop',
    isVerified: true,
    category: 'Audio'
  },
  {
    id: '10',
    title: 'Canon EOS R5 Camera',
    price: 290867, // ₹290,867 (Converted from $3499)
    originalPrice: 332417, // ₹332,417 (Converted from $3999)
    condition: 'excellent',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1471&auto=format&fit=crop',
    isVerified: true,
    category: 'Cameras'
  },
  {
    id: '11',
    title: 'Microsoft Surface Laptop 4',
    price: 83067, // ₹83,067 (Converted from $999)
    originalPrice: 108367, // ₹108,367 (Converted from $1299)
    condition: 'good',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1625295114771-8b43e5ccaa92?q=80&w=1470&auto=format&fit=crop',
    isVerified: true,
    category: 'Laptops'
  },
  {
    id: '12',
    title: 'Google Pixel 6 Pro - Stormy Black',
    price: 49917, // ₹49,917 (Converted from $599)
    originalPrice: 74767, // ₹74,767 (Converted from $899)
    condition: 'fair',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1635870880642-5912c3367c6d?q=80&w=1364&auto=format&fit=crop',
    isVerified: true,
    category: 'Smartphones'
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Smartphones",
  "Laptops",
  "Tablets",
  "Audio",
  "Cameras",
  "Gaming",
  "Wearables",
  "Drones",
  "Accessories"
];

// Conditions for filtering
const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" }
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 350000]); // ₹0 to ₹350,000
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Filter products based on all criteria
  const filteredProducts = allProducts.filter(product => {
    // Search query filter
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Condition filter
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
    
    // Verification filter
    const matchesVerification = !onlyVerified || product.isVerified;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCondition && matchesVerification;
  });
  
  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setPriceRange([0, 350000]);
    setSelectedConditions([]);
    setOnlyVerified(false);
  };
  
  const toggleCondition = (condition: string) => {
    setSelectedConditions(prevConditions => 
      prevConditions.includes(condition) 
        ? prevConditions.filter(c => c !== condition)
        : [...prevConditions, condition]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Shop All Products</h1>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-[300px]"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleFilterMenu}
                className={filterMenuOpen ? 'bg-accent text-white' : ''}
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={toggleFilterMenu}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="block md:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar - larger screens */}
            <div className={`md:w-1/4 lg:w-1/5 md:block ${filterMenuOpen ? 'block' : 'hidden'} md:sticky md:top-32 md:self-start`}>
              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-xs"
                  >
                    Reset All
                  </Button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <Button 
                        key={category}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-sm h-auto py-1 ${
                          selectedCategory === category ? 'bg-accent/10 text-accent' : ''
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      max={350000}
                      step={5000}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Condition */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map(condition => (
                      <div key={condition.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`condition-${condition.value}`}
                          checked={selectedConditions.includes(condition.value)}
                          onCheckedChange={() => toggleCondition(condition.value)}
                        />
                        <Label htmlFor={`condition-${condition.value}`} className="text-sm">
                          {condition.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Verified Only */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified"
                      checked={onlyVerified}
                      onCheckedChange={() => setOnlyVerified(!onlyVerified)}
                    />
                    <Label htmlFor="verified" className="text-sm flex items-center">
                      <Cpu size={14} className="mr-1 text-accent" />
                      AI Verified Only
                    </Label>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 md:hidden"
                  onClick={toggleFilterMenu}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <Tabs defaultValue="grid" className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} products found
                  </span>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id}
                      className="animate-fade-in glass p-4 rounded-lg flex gap-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium mb-1">{product.title}</h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm line-through text-muted-foreground">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <span className="capitalize mr-2">{product.condition}</span>
                          {product.isVerified && (
                            <span className="flex items-center text-accent">
                              <Cpu size={12} className="mr-1" />
                              AI Verified
                            </span>
                          )}
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
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

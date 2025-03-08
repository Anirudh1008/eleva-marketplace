import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/components/FeaturedProducts';
import WishlistItem from '@/components/WishlistItem';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample products for demo
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Graphite',
    price: 699,
    originalPrice: 999,
    condition: 'like-new',
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
    condition: 'good',
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
    condition: 'fair',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1388&auto=format&fit=crop',
    isVerified: true,
    category: 'audio'
  }
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch wishlist from backend or localStorage
    setWishlistItems(sampleProducts);
    
    // Get cart items from localStorage
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      } else {
        // Sample cart items for demo if none exist
        setCartItems([sampleProducts[0]]);
        localStorage.setItem('cartItems', JSON.stringify([sampleProducts[0]]));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      // Fallback to demo
      setCartItems([sampleProducts[0]]);
    }
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist"
    });
  };

  const handleAddToCart = (product: Product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart`
      });
    } else {
      toast({
        title: "Already in cart",
        description: "This item is already in your cart"
      });
    }
  };

  const handleAddAllToCart = () => {
    const newItems = wishlistItems.filter(
      wishlistItem => !cartItems.some(cartItem => cartItem.id === wishlistItem.id)
    );
    
    if (newItems.length > 0) {
      const updatedCart = [...cartItems, ...newItems];
      setCartItems(updatedCart);
      
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      toast({
        title: "Items added to cart",
        description: `${newItems.length} items have been added to your cart`
      });
    } else {
      toast({
        title: "No new items to add",
        description: "All wishlist items are already in your cart"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0"
                onClick={handleAddAllToCart}
              >
                <ShoppingCart size={16} className="mr-2" />
                Add All to Cart
              </Button>
            )}
          </div>
          
          {wishlistItems.length > 0 ? (
            <div className="space-y-4">
              {wishlistItems.map(item => (
                <WishlistItem 
                  key={item.id} 
                  product={item} 
                  onRemove={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/30 rounded-xl">
              <Heart size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Explore our products and add items to your wishlist
              </p>
              <Link to="/shop">
                <Button>
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
          
          {wishlistItems.length > 0 && (
            <div className="mt-8 flex justify-between items-center">
              <Link to="/shop">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              
              <Link to="/payment">
                <Button>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
          
          {/* AI Feature Recommendations */}
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">AI Features You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/ai-verification" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <h3 className="font-semibold mb-2">AI Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Verify the authenticity and condition of products before you buy.
                </p>
              </Link>
              
              <Link to="/instant-comparison" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <h3 className="font-semibold mb-2">Instant Comparison</h3>
                <p className="text-sm text-muted-foreground">
                  Compare products to find the best value for your needs.
                </p>
              </Link>
              
              <Link to="/swap-trade" className="glass rounded-xl p-5 hover:shadow-md transition-all hover:border-accent/30 border border-accent/10">
                <h3 className="font-semibold mb-2">AI Swap & Trade</h3>
                <p className="text-sm text-muted-foreground">
                  Trade in your current devices for new ones with smart valuation.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;

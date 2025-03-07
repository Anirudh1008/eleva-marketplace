
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, Cpu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Product } from '@/components/ProductCard';
import WishlistItem from './WishlistItem';
import { Badge } from '@/components/ui/badge';

// Sample cart items
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

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsLoggedIn(true);
    }
    
    // Load sample data for demo
    setWishlistItems(sampleProducts.slice(0, 2));
    setCartItems(sampleProducts.slice(1, 3));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  
  const handleUserClick = () => {
    if (isLoggedIn) {
      // Navigate to profile
      window.location.href = '/profile';
    } else {
      // Show login modal
      toast({
        title: "Authentication Required",
        description: "Please login or signup to continue",
        action: (
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
        ),
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist."
    });
  };

  const handleAddToCart = (product: Product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`
      });
    } else {
      toast({
        title: "Already in cart",
        description: "This item is already in your cart."
      });
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: "The item has been removed from your cart."
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0) * 83; // Convert to INR
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-1.5 bg-accent/10 rounded-lg mr-1">
            <Cpu size={20} className="text-accent" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-700">
            AITronics
          </span>
        </Link>

        <div className="hidden md:block w-1/2 max-w-xl">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="button-hover hover:bg-accent/10 hover:text-accent"
              >
                <Heart size={20} className="mr-1" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <Badge className="ml-1 bg-accent text-white">{wishlistItems.length}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>My Wishlist</SheetTitle>
                <SheetDescription>
                  {wishlistItems.length > 0 ? 
                    `You have ${wishlistItems.length} items in your wishlist.` : 
                    "Your wishlist is empty."
                  }
                </SheetDescription>
              </SheetHeader>
              
              {wishlistItems.length > 0 ? (
                <div className="space-y-3 mt-4">
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
                <div className="text-center py-10">
                  <Heart size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-4">Start exploring and add products to your wishlist!</p>
                  <Link to="/shop">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="button-hover rounded-full hover:bg-accent/10 hover:text-accent"
            onClick={handleUserClick}
          >
            <User size={20} />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="button-hover rounded-full hover:bg-accent/10 hover:text-accent relative">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">{cartItems.length}</span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItems.length > 0 ? 
                    `You have ${cartItems.length} items in your cart.` : 
                    "Your cart is empty."
                  }
                </SheetDescription>
              </SheetHeader>
              
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3 mt-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex border rounded-lg overflow-hidden glass">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="font-bold">₹{Math.round(item.price * 83).toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Button className="w-full">Proceed to Checkout</Button>
                    <Link to="/shop">
                      <Button variant="outline" className="w-full">Continue Shopping</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <ShoppingCart size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">Start adding products to your cart!</p>
                  <Link to="/shop">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden button-hover rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 p-4 animate-fade-in shadow-lg border-t border-white/20">
          <div className="mb-4">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-3">
            <Link 
              to="/wishlist" 
              className={`px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                isActive('/wishlist') ? 'bg-accent/10 text-accent' : 'hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <div className="flex items-center">
                <Heart size={16} className="mr-2" />
                Wishlist
              </div>
              {wishlistItems.length > 0 && (
                <Badge className="bg-accent text-white">{wishlistItems.length}</Badge>
              )}
            </Link>
            <Link 
              to={isLoggedIn ? "/profile" : "/login"} 
              className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors flex items-center"
            >
              <User size={16} className="mr-2" />
              {isLoggedIn ? "My Profile" : "Login/Signup"}
            </Link>
            <Link 
              to="/cart" 
              className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors flex justify-between items-center"
            >
              <div className="flex items-center">
                <ShoppingCart size={16} className="mr-2" />
                Cart
              </div>
              {cartItems.length > 0 && (
                <Badge className="bg-accent text-white">{cartItems.length}</Badge>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LogIn,
  Search,
  Menu,
  X,
  ShoppingCart,
  Bell,
  Heart,
  User,
  LogOut,
  Home,
  Smartphone,
  Laptop,
  Headphones,
  Tablet,
  Camera,
  Watch,
  Gamepad,
  Tv,
  Speaker,
  UserPlus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);
  const [cartCount, setCartCount] = useState(2);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setIsLoggedIn(parsed.isLoggedIn || false);
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    navigate('/');
  };

  const categories = [
    { name: 'Smartphones', icon: <Smartphone size={18} /> },
    { name: 'Laptops', icon: <Laptop size={18} /> },
    { name: 'Audio', icon: <Headphones size={18} /> },
    { name: 'Tablets', icon: <Tablet size={18} /> },
    { name: 'Cameras', icon: <Camera size={18} /> },
    { name: 'Smartwatches', icon: <Watch size={18} /> },
    { name: 'Gaming', icon: <Gamepad size={18} /> },
    { name: 'TVs', icon: <Tv size={18} /> },
    { name: 'Speakers', icon: <Speaker size={18} /> },
  ];

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/login');
    // The Login page has a tab for signup
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 glass border-b border-accent/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-accent p-2 rounded-full">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">AITronics</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Button
                  type="submit"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 h-auto"
                >
                  Go
                </Button>
              </div>
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search size={20} />
          </Button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                {/* Notification */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell size={20} />
                      {notifications > 0 && (
                        <Badge
                          className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-red-500"
                          variant="default"
                        >
                          {notifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Notification Items */}
                    <div className="max-h-60 overflow-y-auto">
                      <div className="p-2 text-sm hover:bg-accent/10 rounded-md">
                        <p className="font-medium">Your order has been shipped!</p>
                        <p className="text-muted-foreground">Your iPhone 13 Pro is on the way.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-2 text-sm hover:bg-accent/10 rounded-md">
                        <p className="font-medium">Price Drop Alert</p>
                        <p className="text-muted-foreground">MacBook Air M1 is now 10% off!</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-2 text-sm hover:bg-accent/10 rounded-md">
                        <p className="font-medium">New Message</p>
                        <p className="text-muted-foreground">Seller has responded to your inquiry.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button variant="ghost" className="w-full text-xs">View All Notifications</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:flex"
                  onClick={() => navigate('/wishlist')}
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-red-500"
                      variant="default"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>

                {/* Cart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-red-500"
                      variant="default"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar-placeholder.png" />
                        <AvatarFallback>
                          <User size={16} />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2" size={16} />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                      <Heart className="mr-2" size={16} />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/sell')}>
                      Sell an Item
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={navigateToLogin} className="hidden sm:flex">
                  <LogIn size={18} className="mr-1" />
                  Login
                </Button>
                <Button variant="outline" size="sm" onClick={navigateToSignup} className="hidden sm:flex">
                  <UserPlus size={18} className="mr-1" />
                  Sign Up
                </Button>
                <Button variant="ghost" size="icon" onClick={navigateToLogin} className="sm:hidden">
                  <LogIn size={20} />
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden ml-1" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search (Expanded) */}
        {isSearchExpanded && (
          <div className="py-3 md:hidden">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Button
                  type="submit"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 h-auto"
                >
                  Go
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Category Navigation */}
        <nav className="hidden md:flex items-center space-x-1 h-10 overflow-x-auto thin-scrollbar">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium"
            onClick={() => navigate('/')}
          >
            <Home size={18} className="mr-1" />
            Home
          </Button>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-sm font-medium whitespace-nowrap"
              onClick={() => navigate(`/shop?category=${category.name.toLowerCase()}`)}
            >
              {category.icon}
              <span className="ml-1">{category.name}</span>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-accent/10 absolute left-0 right-0 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Categories */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-xs h-auto py-2 justify-start"
                    onClick={() => {
                      navigate(`/shop?category=${category.name.toLowerCase()}`);
                      setIsMenuOpen(false);
                    }}
                  >
                    {category.icon}
                    <span className="ml-1 truncate">{category.name}</span>
                  </Button>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                    >
                      <User size={18} className="mr-2" />
                      My Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/wishlist');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Heart size={18} className="mr-2" />
                      Wishlist
                      {wishlistCount > 0 && (
                        <Badge className="ml-auto" variant="default">
                          {wishlistCount}
                        </Badge>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/sell');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sell an Item
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigateToLogin();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn size={18} className="mr-2" />
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => {
                        navigateToSignup();
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserPlus size={18} className="mr-2" />
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

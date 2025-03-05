
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            Eleva
          </span>
        </Link>

        <div className="hidden md:block w-1/2 max-w-xl">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="button-hover">
            <Link to="/sell" className="flex items-center space-x-1">
              <span>Sell</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="button-hover">
            <Link to="/compare" className="flex items-center space-x-1">
              <span>Compare</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="button-hover">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="button-hover">
            <ShoppingCart size={20} />
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden button-hover"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dark absolute top-full left-0 right-0 p-4 animate-fade-in">
          <div className="mb-4">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-3">
            <Link to="/sell" className="px-3 py-2 hover:bg-black/5 rounded-md">
              Sell
            </Link>
            <Link to="/compare" className="px-3 py-2 hover:bg-black/5 rounded-md">
              Compare
            </Link>
            <Link to="/account" className="px-3 py-2 hover:bg-black/5 rounded-md">
              Account
            </Link>
            <Link to="/cart" className="px-3 py-2 hover:bg-black/5 rounded-md">
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

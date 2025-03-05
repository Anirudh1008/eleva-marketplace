
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, Zap } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-1.5 bg-accent/10 rounded-lg mr-1">
            <Zap size={20} className="text-accent" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-700">
            Eleva
          </span>
        </Link>

        <div className="hidden md:block w-1/2 max-w-xl">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="button-hover hover:bg-accent/10 hover:text-accent">
            <Link to="/sell" className="flex items-center space-x-1">
              <span>Sell</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="button-hover hover:bg-accent/10 hover:text-accent">
            <Link to="/compare" className="flex items-center space-x-1">
              <span>Compare</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="button-hover rounded-full hover:bg-accent/10 hover:text-accent">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="button-hover rounded-full hover:bg-accent/10 hover:text-accent relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">3</span>
          </Button>
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
            <Link to="/sell" className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors">
              Sell
            </Link>
            <Link to="/compare" className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors">
              Compare
            </Link>
            <Link to="/account" className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors">
              Account
            </Link>
            <Link to="/cart" className="px-3 py-2 hover:bg-accent/10 rounded-md hover:text-accent transition-colors flex justify-between">
              <span>Cart</span>
              <span className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">3</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

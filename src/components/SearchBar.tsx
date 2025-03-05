
import React, { useState } from 'react';
import { Search, X, Zap } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClear = () => {
    setQuery('');
  };

  return (
    <div 
      className={`relative flex items-center w-full transition-all duration-300 rounded-full shadow-sm ${
        isFocused 
          ? 'bg-white shadow-md border border-accent/30 shadow-accent/20' 
          : 'bg-secondary/80 border border-transparent'
      }`}
    >
      <div className="pl-4">
        <Search 
          size={18} 
          className={`transition-colors ${
            isFocused ? 'text-accent' : 'text-muted-foreground'
          }`} 
        />
      </div>
      <input
        type="text"
        placeholder="Search for products, brands, and more..."
        className="w-full py-2.5 px-3 bg-transparent focus:outline-none text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {query && (
        <button 
          onClick={handleClear}
          className="pr-4 text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
      )}
      {!query && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
          <div className="px-3 py-2 text-xs text-muted-foreground mb-1">Popular Searches</div>
          {['iPhone 13 Pro', 'Samsung Galaxy S22', 'MacBook Air M1', 'Sony WH-1000XM4'].map((suggestion, index) => (
            <div key={index} className="flex items-center px-3 py-2 hover:bg-accent/5 rounded-lg cursor-pointer">
              <Zap size={14} className="text-accent mr-2" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

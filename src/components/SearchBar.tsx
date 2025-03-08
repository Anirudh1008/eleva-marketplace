
import React, { useState } from 'react';
import { Search, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  
  const handleClear = () => {
    setQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/shop?search=${encodeURIComponent(suggestion)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div 
        className={`relative flex items-center w-full transition-all duration-300 rounded-full ${
          isFocused 
            ? 'bg-white shadow-lg ring-2 ring-accent/20 border border-accent/30' 
            : 'bg-secondary/80 border border-transparent shadow'
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
            type="button"
            onClick={handleClear}
            className="pr-4 text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        )}
        {!query && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-fade-in">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Popular Searches</div>
            {['iPhone 13 Pro', 'Samsung Galaxy S22', 'MacBook Air M1', 'Sony WH-1000XM4'].map((suggestion, index) => (
              <div 
                key={index} 
                className="flex items-center px-3 py-2.5 hover:bg-accent/5 rounded-lg cursor-pointer transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="p-1.5 bg-accent/10 rounded-full mr-3">
                  <Zap size={14} className="text-accent" />
                </div>
                <span className="font-medium">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;

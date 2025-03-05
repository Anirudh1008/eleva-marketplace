
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClear = () => {
    setQuery('');
  };

  return (
    <div 
      className={`relative flex items-center w-full transition-all duration-300 rounded-full ${
        isFocused 
          ? 'bg-white shadow-md border border-accent/30' 
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
        className="w-full py-2 px-3 bg-transparent focus:outline-none"
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
    </div>
  );
};

export default SearchBar;

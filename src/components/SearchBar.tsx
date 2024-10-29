import React from 'react';

interface SearchBarProps {
  inputCity: string;
  setInputCity: (city: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  inputCity, 
  setInputCity, 
  onSearch,
  disabled = false 
}) => (
  <form onSubmit={onSearch} className="flex gap-4">
    <input
      type="text"
      value={inputCity}
      onChange={(e) => setInputCity(e.target.value)}
      placeholder="Search for a city..."
      className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      disabled={disabled}
    />
    <button
      type="submit"
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black-600 transition-colors disabled:bg-black-300 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {disabled ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        'Search'
      )}
    </button>
  </form>
);


export default SearchBar;
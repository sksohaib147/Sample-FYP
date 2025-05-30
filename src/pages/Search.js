import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdvancedSearch from '../components/AdvancedSearch';
import SearchResults from '../components/SearchResults';
import api from '../utils/api';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  const handleSearch = async (filters) => {
    setLoading(true);
    setError('');

    try {
      // Convert filters to query parameters
      const queryParams = new URLSearchParams();
      if (filters.searchTerm) queryParams.append('searchTerm', filters.searchTerm);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.condition) queryParams.append('condition', filters.condition);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

      const response = await api.get(`/search/advanced?${queryParams.toString()}`);
      setResults(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  // Handle initial search from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.toString()) {
      const initialFilters = {
        searchTerm: params.get('q') || '',
        category: params.get('category') || '',
        priceRange: {
          min: params.get('minPrice') || '',
          max: params.get('maxPrice') || ''
        },
        location: params.get('location') || '',
        condition: params.get('condition') || '',
        sortBy: params.get('sortBy') || 'newest'
      };
      handleSearch(initialFilters);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
        
        <AdvancedSearch onSearch={handleSearch} />
        
        <div className="mt-8">
          <SearchResults
            results={results}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Search; 
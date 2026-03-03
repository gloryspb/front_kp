import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, SlidersHorizontal, Star } from 'lucide-react';
import { equipment } from '../data/equipment';
import { useCart } from '../context/CartContext';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const Search = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allTerms = useMemo(() => {
    const terms = new Set<string>();
    equipment.forEach((item) => {
      item.name.split(' ').forEach((word) => terms.add(word.toLowerCase()));
      item.brand.split(' ').forEach((word) => terms.add(word.toLowerCase()));
      item.description.split(' ').forEach((word) => terms.add(word.toLowerCase()));
    });
    return Array.from(terms);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 1) {
      const filtered = allTerms
        .filter((term) => term.startsWith(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const filteredEquipment = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return equipment.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const sortedEquipment = useMemo(() => {
    const sorted = [...filteredEquipment];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return sorted.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        });
    }
  }, [filteredEquipment, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Поиск техники
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Поиск по названию, бренду или описанию..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && (
          <>
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Найдено: <span className="font-semibold">{sortedEquipment.length}</span>{' '}
                {sortedEquipment.length === 1
                  ? 'результат'
                  : sortedEquipment.length < 5
                  ? 'результата'
                  : 'результатов'}
              </p>

              <div className="flex items-center space-x-3">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">По цене (возрастанию)</option>
                  <option value="price-desc">По цене (убыванию)</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
            </div>

            {/* Results */}
            {sortedEquipment.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  По запросу «{searchQuery}» ничего не найдено
                </p>
                <p className="text-gray-500">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEquipment.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${
                          item.available ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {item.available ? 'Доступно' : 'Занято'}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.rating}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{item.brand}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          {item.price.toLocaleString()} ₽
                        </span>
                        <span className="text-sm text-gray-500">/сутки</span>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {item.available ? 'Арендовать' : 'Недоступно'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!searchQuery && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Начните вводить запрос для поиска техники
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

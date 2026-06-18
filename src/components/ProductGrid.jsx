import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { SearchX } from 'lucide-react';

export const ProductGrid = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();

  // useMemo caches filtered products list, preventing redundant computations on minor UI updates.
  // Perfect educational illustration of React optimization for beginners!
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Check if Category matches
      const matchesCategory = 
        selectedCategory === 'All' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // 2. Check if Search Query matches Title, Description, or Category
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        query === '' || 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section className="grid-container">
      {/* Search & Category Filter status bar */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="grid-status-bar">
          <div className="status-left">
            Showing {filteredProducts.length} results
            {selectedCategory !== 'All' && <span> in <span className="status-query">"{selectedCategory}"</span></span>}
            {searchQuery && <span> matching <span className="status-query">"{searchQuery}"</span></span>}
          </div>
          <button className="status-clear-btn" onClick={handleResetFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* Grid Display or Empty State rendering */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchX size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-subtitle">
            We couldn't find anything matching your search filters. Try adjusting your terms or check another category!
          </p>
          <button className="empty-state-btn" onClick={handleResetFilters}>
            Reset search options
          </button>
        </div>
      )}
    </section>
  );
};
export default ProductGrid;

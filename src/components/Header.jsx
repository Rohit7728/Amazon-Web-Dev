import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, MapPin, ChevronDown } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Books', 'Home & Kitchen'];

export const Header = () => {
  const { 
    cartTotalItems, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setIsCartOpen 
  } = useCart();

  // Handle immediate input change for real-time search filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <header className="header-wrapper">
      {/* Primary Top Navbar */}
      <div className="navbar">
        {/* Amazon Brand Logo */}
        <div className="nav-logo" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
          <span className="logo-text">amazon<span className="logo-dot">.</span></span>
        </div>

        {/* Deliver Address Selector Placeholder */}
        <div className="nav-deliver">
          <MapPin size={18} />
          <div>
            <span className="deliver-text-1">Deliver to</span>
            <span className="deliver-text-2">United States</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="nav-search-container">
          <select 
            className="nav-search-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
          
          <input 
            type="text" 
            placeholder="Search Amazon Clone products..." 
            className="nav-search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            id="nav-search-input-id"
          />

          <button className="nav-search-btn" aria-label="Search Submit Button">
            <Search size={20} />
          </button>
        </div>

        {/* Right Navigation Links */}
        <div className="nav-right-links">
          {/* Sign In Link */}
          <div className="nav-link-item nav-sign-in">
            <span className="nav-link-subtext">Hello, Sign in</span>
            <span className="nav-link-maintext">Account & Lists <ChevronDown size={12} style={{ display: 'inline' }} /></span>
          </div>

          {/* Orders Link */}
          <div className="nav-link-item">
            <span className="nav-link-subtext">Returns</span>
            <span className="nav-link-maintext">& Orders</span>
          </div>

          {/* Shopping Cart Button */}
          <button 
            className="nav-cart-btn" 
            onClick={() => setIsCartOpen(true)}
            id="nav-cart-trigger-id"
            aria-label="View Shopping Cart"
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={26} />
              {cartTotalItems > 0 && (
                <span className="cart-badge">{cartTotalItems}</span>
              )}
            </div>
            <span className="nav-link-maintext" style={{ marginTop: '10px' }}>Cart</span>
          </button>
        </div>
      </div>

      {/* Subnav Navigation (Categories Quick Links) */}
      <div className="subnavbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`subnav-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: '500', opacity: 0.9 }}>
          Shop today's best deals on hot products!
        </div>
      </div>
    </header>
  );
};
export default Header;

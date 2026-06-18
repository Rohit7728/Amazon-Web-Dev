import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        {/* Global Navigation Header (Logo, Search, Categories) */}
        <Header />

        {/* Primary Page Layout */}
        <main className="main-content">
          {/* Interactive Deals Hero Banner */}
          <BannerSlider />

          {/* Core Product Grid with Category & Search Filters */}
          <ProductGrid />
        </main>

        {/* Overlay Modals & Notification Portals */}
        <ProductModal />
        <CartDrawer />
        <ToastContainer />

        {/* Polished Site Footer */}
        <footer className="footer">
          <div className="footer-logo">
            amazon<span style={{ color: '#ff9900' }}>.</span> clone
          </div>
          <div className="footer-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#support" onClick={(e) => e.preventDefault()}>Help Desk</a>
            <a href="#portfolio" onClick={(e) => e.preventDefault()}>Developer Showcase</a>
          </div>
          <p style={{ marginTop: '15px', color: '#888' }}>
            © 2026 Amazon Clone Web Project. Handcrafted with React and custom CSS variables for educational purposes.
          </p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context object
const CartContext = createContext();

// Create the Custom Provider Component
export const CartProvider = ({ children }) => {
  // State 1: Cart Items (persisted in local storage for a professional feel)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('amazon_clone_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State 2: Search queries to filter products globally
  const [searchQuery, setSearchQuery] = useState('');

  // State 3: Selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State 4: Drawer toggle for the Cart view
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State 5: Active product for detail popup modal
  const [activeProduct, setActiveProduct] = useState(null);

  // State 6: Dynamic visual Toast Notifications (for high-fidelity premium feel)
  const [toasts, setToasts] = useState([]);

  // Sync cart state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amazon_clone_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper: Trigger a beautiful micro-notification toast
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    
    // Automatically clear toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 3000);
  };

  // Add Item to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        triggerToast(`Increased quantity of ${product.title.substring(0, 20)}... in your cart!`, 'info');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      triggerToast(`Added ${product.title.substring(0, 20)}... to your cart!`, 'success');
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    if (item) {
      triggerToast(`Removed ${item.title.substring(0, 20)}... from your cart.`, 'warning');
    }
  };

  // Update Item Quantity (plus/minus controls)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear Cart after successful checkout simulation
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('amazon_clone_cart');
  };

  // Calculate Subtotal & Total Items in Cart
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isCartOpen,
        setIsCartOpen,
        activeProduct,
        setActiveProduct,
        toasts,
        triggerToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to consume Context safely and easily
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, CreditCard } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    clearCart
  } = useCart();

  // Local state to simulate successful checkout sequence
  const [showSuccess, setShowSuccess] = useState(false);

  // Disable background document scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          
          {/* Drawer Header */}
          <div className="drawer-header">
            <div className="drawer-title-wrapper">
              <ShoppingBag size={20} />
              <h2 className="drawer-title">Shopping Cart</h2>
            </div>
            <button 
              className="drawer-close-btn" 
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Shopping Cart"
            >
              <X size={22} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="drawer-content">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  {/* Item Image */}
                  <div className="cart-item-img-container">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                  </div>

                  {/* Item Details */}
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <div className="cart-item-price">
                      ${(item.discountPrice || item.price).toFixed(2)}
                    </div>
                    
                    {/* Item Actions */}
                    <div className="cart-item-actions">
                      {/* Quantity Selector */}
                      <div className="qty-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease Quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase Quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button 
                        className="cart-item-delete"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart-drawer">
                <ShoppingBag size={64} className="empty-cart-icon" />
                <h3 className="empty-cart-title">Your Cart is empty</h3>
                <p className="empty-cart-desc">
                  Explore our products and deals to add items here!
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="drawer-footer">
              <div className="drawer-subtotal">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">${cartSubtotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                <CreditCard size={18} />
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Checkout Simulation Modal Overlay */}
      {showSuccess && (
        <div className="success-overlay" onClick={handleCloseSuccess}>
          <div className="success-card" onClick={(e) => e.stopPropagation()}>
            <div className="success-circle">
              <CheckCircle size={40} />
            </div>
            <h2 className="success-title">Order Placed!</h2>
            <p className="success-desc">
              Thank you for shopping with us! Your mock transaction was successful, and your items are being prepared for shipping.
            </p>
            <button className="success-btn" onClick={handleCloseSuccess}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default CartDrawer;

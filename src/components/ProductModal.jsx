import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';

export const ProductModal = () => {
  const { activeProduct, setActiveProduct, addToCart } = useCart();

  // Disable body scroll when modal is active
  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProduct]);

  if (!activeProduct) return null;

  const {
    title,
    description,
    price,
    discountPrice,
    rating,
    reviewsCount,
    category,
    image,
    features
  } = activeProduct;

  const renderStars = (val) => {
    const stars = [];
    const rounded = Math.round(val);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rounded ? '#ffa41c' : '#e7e7e7', fontSize: '18px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleClose = () => {
    setActiveProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(activeProduct);
    handleClose(); // Close modal on add for simple beginner UX
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={handleClose}
          aria-label="Close Product Details"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Left Column: Product Image */}
          <div className="modal-img-column">
            <img src={image} alt={title} className="modal-img" />
          </div>

          {/* Right Column: Detailed Info */}
          <div className="modal-info-column">
            <span className="card-category" style={{ marginBottom: '10px' }}>{category}</span>
            <h2 className="modal-title">{title}</h2>

            {/* Ratings summary */}
            <div className="rating-container" style={{ marginBottom: '15px' }}>
              <div className="stars-list">
                {renderStars(rating)}
              </div>
              <span className="rating-value" style={{ fontSize: '14px' }}>{rating} out of 5 stars</span>
              <span className="rating-count" style={{ fontSize: '14px' }}>({reviewsCount.toLocaleString()} global ratings)</span>
            </div>

            {/* Price section */}
            <div className="price-block" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
              <span className="price-discounted" style={{ fontSize: '26px' }}>
                <span className="price-symbol" style={{ fontSize: '16px' }}>$</span>
                {discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
              </span>
              {discountPrice && (
                <span className="price-original" style={{ fontSize: '16px' }}>List Price: ${price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="modal-desc">{description}</p>

            {/* Key Features List */}
            {features && features.length > 0 && (
              <>
                <h4 className="modal-features-title">Product details & specifications:</h4>
                <ul className="modal-features-list">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Guarantee and Shipping Indicators */}
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#565959', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Truck size={16} style={{ color: '#00a878' }} />
                <span>Free Shipping on eligible orders</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ShieldCheck size={16} style={{ color: '#00a878' }} />
                <span>1-Year Manufacturer Warranty</span>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="modal-actions">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', color: '#565959' }}>Total Price (Excl. taxes)</span>
                <span style={{ fontSize: '20px', fontWeight: '700' }}>
                  ${(discountPrice || price).toFixed(2)}
                </span>
              </div>
              <button 
                className="card-btn" 
                onClick={handleAddToCart}
                style={{ width: 'auto', padding: '12px 30px' }}
                aria-label={`Add ${title} to Cart`}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;

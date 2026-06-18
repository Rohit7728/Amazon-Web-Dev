import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setActiveProduct } = useCart();

  const {
    title,
    price,
    discountPrice,
    rating,
    reviewsCount,
    category,
    badge,
    image
  } = product;

  // Star rating helper: renders solid yellow stars up to rounded rating and grey stars for the remainder
  const renderStars = (val) => {
    const stars = [];
    const rounded = Math.round(val);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rounded ? '#ffa41c' : '#e7e7e7', fontSize: '16px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Calculate savings percentage
  const savingsPercent = Math.round(((price - discountPrice) / price) * 100);

  return (
    <div className="card">
      {/* Product Card Badge (if present) */}
      {badge && <span className="card-badge">{badge}</span>}

      {/* Image container clickable for product details */}
      <div className="card-img-container" onClick={() => setActiveProduct(product)}>
        <img src={image} alt={title} className="card-img" />
      </div>

      <div className="card-info">
        {/* Category label */}
        <span className="card-category">{category}</span>

        {/* Title clickable for product details */}
        <h3 className="card-title" onClick={() => setActiveProduct(product)}>
          {title}
        </h3>

        {/* Stars rating & count */}
        <div className="rating-container">
          <div className="stars-list">
            {renderStars(rating)}
          </div>
          <span className="rating-value">{rating}</span>
          <span className="rating-count">({reviewsCount.toLocaleString()})</span>
        </div>

        {/* Price layout */}
        <div className="price-block">
          <span className="price-discounted">
            <span className="price-symbol">$</span>
            {discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
          </span>
          
          {discountPrice && (
            <>
              <span className="price-original">${price.toFixed(2)}</span>
              <span className="price-savings">Save {savingsPercent}%</span>
            </>
          )}
        </div>

        {/* Add to Cart button */}
        <button 
          className="card-btn" 
          onClick={() => addToCart(product)}
          aria-label={`Add ${title} to Cart`}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;

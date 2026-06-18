import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNER_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80',
    alt: 'Super Deals Banner'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80',
    alt: 'Kitchen Essentials Upgrade'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80',
    alt: 'Fashion Mega Sale'
  }
];

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === BANNER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="banner-container">
      {/* Navigation Buttons */}
      <button 
        className="banner-btn banner-btn-left" 
        onClick={handlePrevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="banner-btn banner-btn-right" 
        onClick={handleNextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Banner Slides Track */}
      <div 
        className="banner-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNER_IMAGES.map((banner) => (
          <div className="banner-slide" key={banner.id}>
            <img 
              src={banner.url} 
              alt={banner.alt} 
              className="banner-image" 
            />
            {/* Visual gradient mask to fade banner bottom into the grey background */}
            <div className="banner-gradient"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BannerSlider;

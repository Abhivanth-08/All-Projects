
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import ClientShowcase from '@/components/ClientShowcase';

const backgroundImages = [
  '/hero-bg.jpg',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80',
  '/about-company.jpg',
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Full screen hero section with animated background images */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image carousel with fade effect */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-2000"
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}

        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-violet-dark/60 to-black/30 z-10"></div>

        {/* Hero content with improved text contrast */}
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in [text-shadow:_3px_3px_6px_rgba(0,0,0,0.8)]">
              Precision Components for Industry Leaders
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl animate-fade-in [animation-delay:300ms] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
              Elevating manufacturing excellence through high-quality industrial spare parts across India.
            </p>
            <div className="animate-fade-in [animation-delay:600ms]">
              <Link to="/products" onClick={scrollToTop}>
                <AnimatedButton 
                  animationStyle="float" 
                  className="bg-violet hover:bg-violet-dark text-white px-8 py-4 rounded-md text-lg shadow-lg"
                >
                  View All Products
                </AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Scroll down indicator with better visibility */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <ChevronDown className="text-white w-8 h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Client showcase section */}
      <ClientShowcase />

      {/* Enhanced parallax section with better text contrast */}
      <section className="relative h-[70vh] bg-fixed bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-dark/80 via-violet/70 to-violet-dark/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 [text-shadow:_3px_3px_6px_rgba(0,0,0,0.8)]">Extraordinary Precision</h2>
            <p className="text-xl md:text-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
              Setting the standard for excellence in EDM, CNC machine parts, and specialized industrial components that power India's manufacturing sector.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

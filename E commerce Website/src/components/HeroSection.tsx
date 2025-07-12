
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'url(/hero-bg.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Quality Spare Parts for Your Industrial Needs
            </h1>
            <p className="text-lg mb-8 text-violet-light">
              Discover our extensive range of high-quality spare parts for EDM, CNC machines, and more. J.V.Enterprises delivers precision components across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button className="bg-violet hover:bg-violet-dark text-white px-8 py-3 rounded-md text-lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-md text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-semibold text-primary mb-4">Request a Quote</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="What parts are you looking for?" 
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-violet-dark text-white py-3 rounded-md">
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

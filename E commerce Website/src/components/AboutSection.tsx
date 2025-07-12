
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Award, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="/about-image.jpg" 
              alt="About J.V. Enterprises" 
              className="rounded-lg shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-primary mb-6">About J.V. Enterprises</h2>
            <p className="text-gray-700 mb-6">
              J.V. Enterprises was founded in 2009 by ShivaKumar V and has grown into a well-established company specializing in both manufacturing and servicing of various machines and spare parts.
            </p>
            <p className="text-gray-700 mb-8">
              The company is committed to precision and quality, working with some of the most prestigious institutions in the country, including IITs, NITs, and BrahMos Aerospace, to provide high-quality engineering solutions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Shield size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Precision and excellence in every product</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <TrendingUp size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Global Reach</h3>
                  <p className="text-sm text-gray-600">Expanding presence in international markets</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Award size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Trusted Partners</h3>
                  <p className="text-sm text-gray-600">Working with prestigious institutions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Established History</h3>
                  <p className="text-sm text-gray-600">Over a decade of excellence since 2009</p>
                </div>
              </div>
            </div>
            
            <Link to="/about">
              <Button className="bg-primary hover:bg-violet-700 text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

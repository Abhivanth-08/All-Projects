
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, BarChart, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About J.V. Enterprises</h1>
            <p className="text-xl text-violet-100 max-w-3xl">
              A trusted name in manufacturing & service since 2009, delivering precision engineering solutions across India and globally.
            </p>
          </div>
        </div>
        
        {/* Company Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  J.V. Enterprises was founded in 2009 by ShivaKumar V and has grown into a well-established company specializing in both manufacturing and servicing of various machines and spare parts. The company is committed to precision and quality, working with some of the most prestigious institutions in the country.
                </p>
                <p className="text-gray-700 mb-4">
                  We've collaborated with notable institutions including IITs, NITs, and BrahMos Aerospace, providing high-quality engineering solutions tailored to their specific needs. Our dedication to excellence has established us as a trusted partner in the industry.
                </p>
                <p className="text-gray-700 mb-4">
                  Beyond our domestic success, J.V. Enterprises has also expanded its presence in the global market, securing a ₹3 crore deal with Goldsan, a leading company in China. Over the years, the company has earned a strong reputation in the industry, serving well-known companies and building long-term relationships based on trust and reliability.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <img 
                  src="/about-company.jpg" 
                  alt="J.V. Enterprises History" 
                  className="rounded-lg shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission & Values</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                At J.V. Enterprises, we are guided by a clear mission and strong values that define how we operate and serve our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide high-quality manufacturing and service solutions that help our customers achieve operational excellence and innovation in their industries.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To become a global leader in manufacturing and service solutions, recognized for our precision, quality, and innovative approach to engineering challenges.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Approach</h3>
                <p className="text-gray-700">
                  We take a customer-centric approach, focusing on understanding your specific requirements and providing tailored solutions that meet your needs with precision.
                </p>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">Our Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Precision</h4>
                    <p className="text-gray-700">
                      We are committed to precision and excellence in everything we produce.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Integrity</h4>
                    <p className="text-gray-700">
                      We conduct our business with honesty, transparency, and ethical standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Innovation</h4>
                    <p className="text-gray-700">
                      We continuously seek to improve our products and services through innovation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Customer Focus</h4>
                    <p className="text-gray-700">
                      We put our customers at the center of everything we do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
            <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
              Contact us today to discuss your manufacturing and service requirements. Our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-white hover:bg-gray-100 text-primary px-8 py-3 text-lg rounded-md">
                  Get in Touch
                </Button>
              </Link>
              <Link to="/careers">
                <Button className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-3 text-lg rounded-md">
                  Join Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

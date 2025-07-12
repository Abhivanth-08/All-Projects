
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package } from 'lucide-react';

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Product Booking</h1>
            <p className="mt-2 text-blue-100">Book products directly from product pages</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-violet-100 rounded-full mb-6">
              <Package size={40} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Product Booking System</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We've moved to a booking system for better customer service. Browse our products and use the "Book Now" button to request products. We'll contact you with pricing and availability details.
            </p>
            <Link to="/products">
              <Button className="bg-industrial-blue text-white">
                <ShoppingBag className="mr-2" size={18} />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

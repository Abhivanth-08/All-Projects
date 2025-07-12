
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            J.V.Enterprises
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-violet-light transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-violet-light transition-colors">
              Products
            </Link>
            <Link to="/works" className="hover:text-violet-light transition-colors">
              Our Works
            </Link>
            <Link to="/about" className="hover:text-violet-light transition-colors">
              About
            </Link>
            <Link to="/careers" className="hover:text-violet-light transition-colors">
              Careers
            </Link>
            <Link to="/contact" className="hover:text-violet-light transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 rounded-md text-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-white hover:text-violet-light transition-colors" size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-violet text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            
            <Link to="/account">
              <User className="text-white hover:text-violet-light transition-colors" size={24} />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-primary absolute w-full z-50 transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="relative mb-4">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 rounded-md w-full text-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
          
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/works" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              Our Works
            </Link>
            <Link to="/about" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/careers" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              Careers
            </Link>
            <Link to="/contact" className="hover:text-violet-light transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          
          <div className="flex space-x-4 pt-4 border-t border-violet-dark">
            <Link to="/cart" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} />
              <span>Cart ({getCartItemCount()})</span>
            </Link>
            
            <Link to="/account" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <User size={20} />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

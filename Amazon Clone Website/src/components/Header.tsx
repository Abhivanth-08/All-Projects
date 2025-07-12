
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuWaveLink,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '@/components/ui/navigation-menu';
import { categories } from '@/data/products';
import { UserAccountButton } from '@/components/UserAccountButton';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / link.offsetWidth) * 100;
    link.style.setProperty('--x', `${x}%`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = () => {
    scrollToTop();
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-violet text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold" onClick={scrollToTop}>
            J.V.Enterprises
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuWaveLink asChild>
                  <Link to="/" onMouseMove={handleMouseMove} onClick={scrollToTop}>Home</Link>
                </NavigationMenuWaveLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-violet-light">
                  <Link to="/products" onClick={scrollToTop} className="text-white hover:text-violet-light">
                    Products
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 w-[300px] bg-white">
                    {categories.map((category) => (
                      <Link 
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`} 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors bg-white text-violet hover:bg-violet-50 hover:text-violet-dark text-center border border-gray-200 hover:border-violet-300" 
                        onClick={scrollToTop}
                      >
                        <div className="text-sm font-medium leading-none text-violet">{category}</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuWaveLink asChild>
                  <Link to="/works" onMouseMove={handleMouseMove} onClick={scrollToTop}>Our Works</Link>
                </NavigationMenuWaveLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuWaveLink asChild>
                  <Link to="/about" onMouseMove={handleMouseMove} onClick={scrollToTop}>About</Link>
                </NavigationMenuWaveLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuWaveLink asChild>
                  <Link to="/careers" onMouseMove={handleMouseMove} onClick={scrollToTop}>Careers</Link>
                </NavigationMenuWaveLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuWaveLink asChild>
                  <Link to="/contact" onMouseMove={handleMouseMove} onClick={scrollToTop}>Contact</Link>
                </NavigationMenuWaveLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
            
            <Link to="/cart" className="relative" onClick={scrollToTop}>
              <ShoppingCart className="text-white hover:text-violet-light transition-colors" size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-violet-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            
            <UserAccountButton />
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
        "md:hidden bg-violet absolute w-full z-50 transition-all duration-300 ease-in-out",
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
            <Link to="/" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              Home
            </Link>
            <Link to="/products" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              Products
            </Link>
            <Link to="/works" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              Our Works
            </Link>
            <Link to="/about" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              About
            </Link>
            <Link to="/careers" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              Careers
            </Link>
            <Link to="/contact" className="wave-link text-white py-2 px-4 rounded-md" onClick={handleNavigation} onMouseMove={handleMouseMove}>
              Contact
            </Link>
          </nav>
          
          <div className="flex space-x-4 pt-4 border-t border-violet-dark">
            <Link to="/cart" className="flex items-center space-x-2" onClick={handleNavigation}>
              <ShoppingCart size={20} />
              <span>Cart ({getCartItemCount()})</span>
            </Link>
            
            <Link to="/auth" className="flex items-center space-x-2" onClick={handleNavigation}>
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

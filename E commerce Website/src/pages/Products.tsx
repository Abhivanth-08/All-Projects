
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
    
    if (category) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams]);
  
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    setShowMobileFilters(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
            <p className="mt-2 text-blue-100">Browse our extensive range of industrial spare parts</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={18} />
                <span>Filter Products</span>
              </Button>
            </div>
            
            {/* Sidebar Filters */}
            <div className={`md:w-1/4 lg:w-1/5 md:block ${showMobileFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  {showMobileFilters && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <button
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === null
                        ? 'bg-industrial-blue text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    All Products
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-industrial-blue text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {selectedCategory || 'All Products'}{' '}
                  <span className="text-gray-500 font-normal">
                    ({filteredProducts.length} items)
                  </span>
                </h2>
                
                <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-industrial-blue">
                  <option>Sort by: Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Name: Z to A</option>
                </select>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

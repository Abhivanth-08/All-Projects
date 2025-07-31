import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { products, getFeaturedProducts } from '@/data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products.filter(p => !['EDM Parts', 'Wire EDM Consumables', 'Wire Filters'].includes(p.category)));
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const category = searchParams.get('category');
    const searchParam = searchParams.get('search');
    let productsToShow = products;
    
    if (category) {
      productsToShow = products.filter(product => product.category === category);
    } else if (searchParam) {
      productsToShow = products.filter(product => 
        product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.category.toLowerCase().includes(searchParam.toLowerCase())
      );
    } else {
      // Show all products except EDM categories by default
      productsToShow = products.filter(product => !['EDM Parts', 'Wire EDM Consumables', 'Wire Filters'].includes(product.category));
    }

    // Apply sorting
    const sortedProducts = [...productsToShow];
    switch (sortOption) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [searchParams, sortOption]);

  const recommendedProducts = getFeaturedProducts().slice(0, 4);
  
  // Check if current category should show images
  const selectedCategory = searchParams.get('category');
  const isCategoryView = selectedCategory && ['EDM Parts', 'Wire EDM Consumables', 'Wire Filters'].includes(selectedCategory);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const filteredSearchProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleProductSelect = (productId: number) => {
    navigate(`/products/${productId}`);
    setSearchQuery('');
    setShowSearchResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchResults(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">Our Products</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Browse our extensive range of industrial spare parts</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <section className="mb-8">
            <div className="max-w-md mx-auto relative">
              <form onSubmit={handleSearchSubmit}>
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-3 rounded-md text-black w-full"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </form>
              
              {showSearchResults && filteredSearchProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                  {filteredSearchProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onMouseDown={() => handleProductSelect(product.id)}
                    >
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.category}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Product List Section */}
          <section className="mb-12">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCategory || 'All Products'}{' '}
                <span className="text-gray-500 font-normal">
                  ({filteredProducts.length} items)
                </span>
              </h2>
              
              <select 
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-industrial-blue bg-white text-gray-700"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className={`${isCategoryView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'product-grid'}`}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showImage={true}
                    categoryView={isCategoryView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No products found in this category.</p>
              </div>
            )}
          </section>

          {/* Recommended Products Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recommended for You</h2>
              <p className="text-gray-600 text-center mb-8">Discover popular products that other customers love</p>
              <div className="product-grid">
                {recommendedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showImage={true}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

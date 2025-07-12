
import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedButton } from '@/components/ui/animated-button';
import { products } from '@/data/products';

const ProductShowcase = () => {
  // Get 3 products from each image category
  const edmParts = products.filter(p => p.category === 'EDM Parts').slice(0, 3);
  const wireConsumables = products.filter(p => p.category === 'Wire EDM Consumables').slice(0, 3);
  const wireFilters = products.filter(p => p.category === 'Wire Filters').slice(0, 3);

  const showcaseCategories = [
    { name: 'EDM Parts', products: edmParts },
    { name: 'Wire EDM Consumables', products: wireConsumables },
    { name: 'Wire Filters', products: wireFilters }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-industrial-blue mb-12">Our Product Categories</h2>
        
        <div className="space-y-8">
          {showcaseCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="aspect-square bg-industrial-lightblue rounded-lg overflow-hidden">
                      <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 mt-2 line-clamp-2">{product.name}</h4>
                    <p className="text-sm text-primary font-semibold">₹{product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" onClick={scrollToTop}>
            <AnimatedButton 
              animationStyle="ripple" 
              className="bg-violet hover:bg-violet-dark text-white px-8 py-3 rounded-md text-lg shadow-lg"
            >
              View All Products
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

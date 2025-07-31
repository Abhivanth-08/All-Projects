
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/data/products';
import { ChevronRight, Truck, ShieldCheck, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductBooking from '@/components/ProductBooking';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const product = getProductById(Number(id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Link to="/products" className="text-industrial-blue hover:underline">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-industrial-blue transition-colors">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/products" className="hover:text-industrial-blue transition-colors">
              Products
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link 
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-industrial-blue transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800">{product.name}</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="bg-industrial-lightblue rounded-lg flex items-center justify-center p-8">
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name}
                  className="max-w-full max-h-96 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div>
                <span className="inline-block bg-industrial-lightblue text-industrial-blue rounded-full px-3 py-1 text-sm font-semibold mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h1>
                
                <p className="text-gray-600 mb-8">{product.description}</p>
                
                <div className="mb-8">
                  <ProductBooking product={product} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <Package size={20} className="text-industrial-blue mr-2" />
                    <span className="text-sm">Secure Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-industrial-blue mb-8">Related Products</h2>
              <div className="product-grid">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

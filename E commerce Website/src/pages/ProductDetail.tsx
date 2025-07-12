
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronRight, Minus, Plus, Truck, ShieldCheck, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(Number(id));
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Link to="/products">
              <Button className="bg-industrial-blue text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <div className="text-3xl font-bold text-industrial-blue mb-6">
                  {formatPrice(product.price)}
                </div>
                
                <p className="text-gray-600 mb-8">{product.description}</p>
                
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 py-2 text-gray-800 font-medium">{quantity}</span>
                      <button 
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <Button 
                      className="bg-industrial-blue hover:bg-blue-700 text-white flex-1"
                      onClick={() => addToCart(product, quantity)}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full bg-industrial-orange hover:bg-orange-600 text-white py-3"
                  >
                    Buy Now
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <Truck size={20} className="text-industrial-blue mr-2" />
                    <span className="text-sm">Free shipping across India</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck size={20} className="text-industrial-blue mr-2" />
                    <span className="text-sm">1 Year Warranty</span>
                  </div>
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

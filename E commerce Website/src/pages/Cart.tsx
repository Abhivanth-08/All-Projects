
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, addToCart, getCartTotal, clearCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <p className="mt-2 text-blue-100">Review and modify your items before checkout</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Quantity</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map(item => (
                      <tr key={item.product.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={item.product.image || "/placeholder.svg"} 
                              alt={item.product.name}
                              className="w-16 h-16 object-contain bg-gray-100 rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <div>
                              <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-800 font-medium">
                            {formatPrice(item.product.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  addToCart(item.product, -1);
                                }
                              }}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-gray-800 font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              onClick={() => addToCart(item.product, 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-industrial-blue font-bold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  className="text-industrial-blue border-industrial-blue hover:bg-industrial-lightblue"
                  asChild
                >
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(getCartTotal() * 0.18)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-industrial-blue">
                        {formatPrice(getCartTotal() * 1.18)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Including 18% GST</p>
                  </div>
                </div>
                
                <Button className="w-full bg-industrial-orange hover:bg-orange-600 text-white py-3 flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                
                <div className="mt-6 text-gray-600 text-sm">
                  <p className="mb-2">We accept:</p>
                  <div className="flex space-x-3">
                    <div className="p-2 bg-gray-100 rounded">Credit Card</div>
                    <div className="p-2 bg-gray-100 rounded">Debit Card</div>
                    <div className="p-2 bg-gray-100 rounded">UPI</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-industrial-lightblue rounded-lg p-6">
                <h3 className="font-bold text-industrial-blue mb-4">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you have any questions about your order or need technical assistance, our team is here to help.
                </p>
                <Link to="/contact" className="text-industrial-blue hover:underline font-medium">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

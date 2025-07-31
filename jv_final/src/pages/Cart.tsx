
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Package, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="bg-industrial-blue text-white py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
              <p className="mt-2 text-blue-100">Your selected items</p>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-violet-100 rounded-full mb-6">
                <Package size={40} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start shopping to add items to your cart. Browse our products and find what you need.
              </p>
              <Link to="/products">
                <Button className="bg-industrial-blue text-white hover:bg-industrial-blue hover:text-white">
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <p className="mt-2 text-blue-100">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={item.product.image || "/placeholder.svg"} 
                          alt={item.product.name}
                          className="w-full h-full object-contain rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm">{item.product.category}</p>
                        <p className="text-violet font-bold">₹{item.product.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Clear Cart
              </Button>
              
              <Link to="/products">
                <Button variant="outline" className="hover:bg-white hover:text-industrial-blue">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

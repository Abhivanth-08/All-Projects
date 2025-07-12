
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="product-card">
      <div className="relative overflow-hidden group">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name}
          className="w-full h-56 object-contain bg-industrial-lightblue p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/products/${product.id}`}>
            <Button variant="outline" size="icon" className="rounded-full bg-white text-black hover:bg-violet hover:text-white">
              <Eye size={18} />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white text-black hover:bg-violet hover:text-white"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-violet font-semibold mb-1">
          {product.category}
        </div>
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-800 hover:text-primary transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button 
            variant="default" 
            size="sm"
            className="bg-primary hover:bg-violet-dark text-white"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

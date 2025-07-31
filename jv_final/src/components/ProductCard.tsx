
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductBooking from '@/components/ProductBooking';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  showImage?: boolean;
  categoryView?: boolean;
}

const ProductCard = ({ product, showImage = true, categoryView = false }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6 flex flex-col h-full">
        {product.image && (
          <div className="mb-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        )}
        
        <div className="flex-grow">
          <div className="mb-3">
            <span className="inline-block bg-industrial-lightblue text-industrial-blue rounded-full px-3 py-1 text-sm font-semibold">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
            {product.description}
          </p>
        </div>
        
        <div className="mt-auto space-y-2">
          <ProductBooking product={product} />
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-violet hover:bg-violet-dark text-white py-2 px-4 rounded-md transition-colors text-sm"
          >
            Add to Cart
          </Button>
          
          <Link to={`/products/${product.id}`} className="block">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm">
              View Details
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

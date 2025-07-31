
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { wireEdmCategories, formatCategoryName } from '@/data/wire-edm-categories';

const WireEdmCategories = () => {
  return (
    <div className="space-y-8">
      {Object.entries(wireEdmCategories).map(([category, products]) => (
        <Card key={category} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{formatCategoryName(category)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(products).map(([name, imageUrl]) => (
                <div key={name} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={name.replace('.jpg', '')}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {name.replace('.jpg', '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WireEdmCategories;

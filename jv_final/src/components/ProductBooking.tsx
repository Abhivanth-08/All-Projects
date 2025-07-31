
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductBookingProps {
  product: Product;
}

const ProductBooking = ({ product }: ProductBookingProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    quantity: 1,
    deadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book products.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        user_id: user.id,
        profile_id: user.id, // Link to user profile
        product_id: product.id,
        product_name: product.name,
        quantity: parseInt(bookingData.quantity.toString()),
        deadline: bookingData.deadline || null,
        user_name: user.user_metadata?.full_name || 'Not provided',
        user_email: user.email,
        user_phone: user.user_metadata?.phone || 'Not provided',
      };

      // Insert booking
      const { error: dbError } = await supabase
        .from('product_bookings')
        .insert([bookingPayload]);

      if (dbError) throw dbError;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'product_booking',
          data: bookingPayload
        }
      });

      toast({
        title: "Booking Successful!",
        description: "You have booked the product. The company will call you and verify the same.",
      });

      setIsOpen(false);
      setBookingData({ quantity: 1, deadline: '' });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-industrial-blue hover:bg-blue-700 text-white">
            <Package size={18} className="mr-2" />
            Book Now
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white">Sign In Required</DialogTitle>
          </DialogHeader>
          <div className="text-center p-6">
            <p className="mb-4 text-white">Please sign in to book products.</p>
            <Link to="/auth">
              <Button className="bg-industrial-blue text-white">Sign In</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-industrial-blue hover:bg-blue-700 text-white">
          <Package size={18} className="mr-2" />
          Book Now
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-white">Book Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-white">Product</Label>
            <Input
              id="product-name"
              value={product.name}
              disabled
              className="bg-gray-50 text-gray-900"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-white">Quantity *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={bookingData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="bg-white text-gray-900"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-white">Deadline (Optional)</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={bookingData.deadline}
                onChange={handleChange}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-white border-white hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-industrial-blue hover:bg-blue-700 text-white active:text-white focus:text-white"
            >
              {isSubmitting ? 'Booking...' : 'Book Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBooking;

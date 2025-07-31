
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  product_name: string;
  quantity: number;
  deadline: string | null;
  status: string | null;
  created_at: string;
}

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('product_bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch your bookings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <p>Loading your bookings...</p>
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
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
              My Bookings
            </h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
              Track your product bookings and orders
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Bookings Found</h2>
              <p className="text-gray-500 mb-6">You haven't made any product bookings yet.</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-violet hover:bg-violet-dark text-white px-6 py-3 rounded-md transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {booking.product_name}
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status || 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Quantity:</span>
                        <p className="text-gray-800">{booking.quantity}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Deadline:</span>
                        <p className="text-gray-800">
                          {booking.deadline ? new Date(booking.deadline).toLocaleDateString() : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Booked on:</span>
                        <p className="text-gray-800">
                          {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;

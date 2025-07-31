
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface Booking {
  id: string;
  product_name: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  quantity: number;
  deadline: string;
  status: string;
  created_at: string;
  profiles?: {
    name: string;
    age: number;
    mobile_number: string;
    company_name: string;
    country: string;
    state: string;
    district: string;
    email: string;
  };
}

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      setError(null);
      
      const { data, error } = await supabase
        .from('product_bookings')
        .select(`
          *,
          profiles (
            name,
            age,
            mobile_number,
            company_name,
            country,
            state,
            district,
            email
          )
        `)
        .order('created_at', { ascending: false });

      console.log('Bookings fetch response:', { data, error });

      if (error) {
        console.error('Error fetching bookings:', error);
        setError(`Failed to fetch bookings: ${error.message}`);
        toast({
          title: "Error",
          description: `Failed to fetch bookings: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Bookings fetched successfully:', data?.length);
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      console.log('Updating booking status:', { bookingId, newStatus });
      
      const { error } = await supabase
        .from('product_bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        console.error('Error updating booking status:', error);
        toast({
          title: "Error",
          description: `Failed to update booking status: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Booking ${newStatus} successfully`,
        });
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const removeBookingFrontend = (id: string) => {
    setBookings(bookings => bookings.filter(b => b.id !== id));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <AnimatedButton 
              onClick={fetchBookings}
              className="bg-violet hover:bg-violet-dark text-white"
            >
              Retry
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management ({bookings.length} bookings)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.product_name}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.profiles?.name || booking.user_name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{booking.profiles?.email || booking.user_email || 'N/A'}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.profiles?.mobile_number || booking.user_phone || 'N/A'}</TableCell>
                <TableCell>{booking.quantity}</TableCell>
                <TableCell>
                  {booking.deadline ? format(new Date(booking.deadline), 'MMM dd, yyyy') : 'Not specified'}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      booking.status === 'confirmed' ? 'default' : 
                      booking.status === 'cancelled' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    <Dialog>
                      <DialogTrigger asChild>
                        <AnimatedButton
                          size="sm"
                          animationStyle="glowing"
                          className="bg-violet-600 hover:bg-violet-700 text-white border-0 mb-1"
                        >
                          <Eye size={16} className="mr-1" />
                          View Details
                        </AnimatedButton>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg bg-white text-black border border-gray-200">
                        <DialogHeader>
                          <DialogTitle className="text-black">Customer & Booking Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 max-h-96 overflow-y-auto text-black">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Personal Information</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Name:</span> {booking.profiles?.name || booking.user_name || 'N/A'}</p>
                              <p><span className="font-medium">Age:</span> {booking.profiles?.age || 'N/A'}</p>
                              <p><span className="font-medium">Email:</span> {booking.profiles?.email || booking.user_email || 'N/A'}</p>
                              <p><span className="font-medium">Phone:</span> {booking.profiles?.mobile_number || booking.user_phone || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Location Details</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Company:</span> {booking.profiles?.company_name || 'N/A'}</p>
                              <p><span className="font-medium">Country:</span> {booking.profiles?.country || 'N/A'}</p>
                              <p><span className="font-medium">State:</span> {booking.profiles?.state || 'N/A'}</p>
                              <p><span className="font-medium">District:</span> {booking.profiles?.district || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Current Booking</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Product:</span> {booking.product_name}</p>
                              <p><span className="font-medium">Quantity:</span> {booking.quantity}</p>
                              <p><span className="font-medium">Deadline:</span> {booking.deadline ? format(new Date(booking.deadline), 'MMM dd, yyyy') : 'Not specified'}</p>
                              <p><span className="font-medium">Status:</span> 
                                <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'cancelled' ? 'destructive' : 'secondary'} className="ml-2">
                                  {booking.status}
                                </Badge>
                              </p>
                              <p><span className="font-medium">Booked On:</span> {format(new Date(booking.created_at), 'MMM dd, yyyy HH:mm')}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Booking History</h4>
                            <p className="text-sm text-gray-600">Complete booking history will be available once user profile integration is implemented.</p>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Application History</h4>
                            <p className="text-sm text-gray-600">Job application history will be available once user profile integration is implemented.</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {booking.status === 'pending' && (
                      <div className="flex gap-2 flex-wrap">
                        <AnimatedButton
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          animationStyle="pulse"
                          className="bg-green-600 hover:bg-green-700 text-white border-0 mb-1"
                        >
                          Confirm
                        </AnimatedButton>
                        <AnimatedButton
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          animationStyle="bounce"
                          className="bg-red-500 hover:bg-red-600 text-white border-0 mb-1"
                        >
                          Cancel
                        </AnimatedButton>
                      </div>
                    )}
                    {booking.status === 'confirmed' && (
                      <AnimatedButton
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        animationStyle="bounce"
                        className="bg-red-500 hover:bg-red-600 text-white border-0 mb-1"
                      >
                        Cancel
                      </AnimatedButton>
                    )}
                    <AnimatedButton
                      size="sm"
                      onClick={() => removeBookingFrontend(booking.id)}
                      animationStyle="pulse"
                      className="bg-gray-400 hover:bg-gray-600 text-white border-0 mb-1"
                    >
                      Remove
                    </AnimatedButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingManagement;

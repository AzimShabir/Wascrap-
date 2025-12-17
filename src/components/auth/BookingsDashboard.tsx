import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Phone, Scale, User, CheckCircle, XCircle, Mail } from 'lucide-react';
import { format } from 'date-fns';
import type { Json } from '@/integrations/supabase/types';
import ScrapBuyerReview from '@/components/admin/ScrapBuyerReview';

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  scrap_types: Json;
  total_weight: number;
  pickup_date: string;
  pickup_time: string;
  status: string;
  created_at: string;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
}

const BookingsDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    fetchBookings();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) throw error;
      setIsAdmin(!!data);
    } catch (error: any) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (bookingId: string, customerEmail: string) => {
    setActionLoading(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke('send-notification-email', {
        body: {
          to: customerEmail,
          type: 'order_completed',
          bookingId
        }
      });

      toast({
        title: "Success",
        description: "Order completed successfully! Customer has been notified.",
      });

      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const cancelOrder = async (bookingId: string, customerEmail: string, reason: string) => {
    if (!reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a cancellation reason",
        variant: "destructive",
      });
      return;
    }

    setActionLoading(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancellation_reason: reason
        })
        .eq('id', bookingId);

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke('send-notification-email', {
        body: {
          to: customerEmail,
          type: 'order_cancelled',
          bookingId,
          reason
        }
      });

      toast({
        title: "Success",
        description: "Order cancelled successfully! Customer has been notified.",
      });

      setCancelReason('');
      setSelectedBooking(null);
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const parseScrapTypes = (scrapTypes: Json): any[] => {
    if (Array.isArray(scrapTypes)) {
      return scrapTypes;
    }
    if (typeof scrapTypes === 'string') {
      try {
        return JSON.parse(scrapTypes);
      } catch {
        return [];
      }
    }
    return [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-base md:text-lg text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-6 md:py-8 px-3 md:px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            Pickup <span className="text-green-600">Orders</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Manage and track all scrap collection requests
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Badge variant="outline" className="text-sm md:text-base lg:text-lg px-3 md:px-4 py-1 md:py-2">
              Total Orders: {bookings.length}
            </Badge>
            <Badge variant="outline" className="text-sm md:text-base lg:text-lg px-3 md:px-4 py-1 md:py-2 bg-amber-50">
              Pending: {pendingBookings.length}
            </Badge>
          </div>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-8 md:py-12">
            <CardContent>
              <div className="text-gray-500 text-base md:text-lg">No bookings found</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => {
              const scrapItems = parseScrapTypes(booking.scrap_types);
              const isPending = booking.status === 'pending';
              const isCompleted = booking.status === 'completed';
              const isCancelled = booking.status === 'cancelled';
              
              return (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 md:pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
                        <User className="w-4 md:w-5 h-4 md:h-5 mr-2 text-green-600" />
                        <span className="truncate">{booking.full_name}</span>
                      </CardTitle>
                      <Badge className={`${getStatusColor(booking.status)} text-xs md:text-sm whitespace-nowrap ml-2`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <CardDescription className="flex items-center text-gray-600 text-xs md:text-sm">
                        <Phone className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                        <span className="truncate">{booking.phone}</span>
                      </CardDescription>
                      <CardDescription className="flex items-center text-gray-600 text-xs md:text-sm">
                        <Mail className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                        <span className="truncate">{booking.email}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 text-xs md:text-sm">
                    <div className="flex items-start">
                      <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{booking.address}</div>
                        <div className="text-gray-600 truncate">{booking.city}, {booking.district}</div>
                        <div className="text-gray-600">{booking.state} - {booking.pincode}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-3 md:w-4 h-3 md:h-4 mr-2 text-green-600 flex-shrink-0" />
                      <span className="truncate">
                        {format(new Date(booking.pickup_date), 'MMM dd, yyyy')} at {booking.pickup_time}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Scale className="w-3 md:w-4 h-3 md:h-4 mr-2 text-green-600 flex-shrink-0" />
                        <span className="font-medium truncate">
                          {booking.total_weight ? `${booking.total_weight} kg` : 'Weight not specified'}
                        </span>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-800 mb-1">Scrap Items:</div>
                        {scrapItems && scrapItems.length > 0 ? (
                          <div className="space-y-1">
                            {scrapItems.slice(0, 3).map((item: any, index: number) => (
                              <div key={index} className="flex justify-between text-gray-600 bg-gray-50 px-2 py-1 rounded text-xs">
                                <span className="capitalize truncate mr-2">{item.type}</span>
                                <span className="font-medium flex-shrink-0">{item.weight} kg</span>
                              </div>
                            ))}
                            {scrapItems.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{scrapItems.length - 3} more items
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">No items specified</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons for Pending Orders */}
                    {isPending && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-3 md:pt-4 border-t">
                        <Button
                          onClick={() => completeOrder(booking.id, booking.email)}
                          disabled={actionLoading === booking.id}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-xs md:text-sm h-8 md:h-10"
                        >
                          <CheckCircle className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                          {actionLoading === booking.id ? 'Processing...' : 'Complete'}
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="flex-1 text-xs md:text-sm h-8 md:h-10"
                              disabled={actionLoading === booking.id}
                              onClick={() => setSelectedBooking(booking.id)}
                            >
                              <XCircle className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-base md:text-lg">Cancel Order</DialogTitle>
                              <DialogDescription className="text-xs md:text-sm">
                                Please provide a reason for cancelling this order. The customer will be notified.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="reason" className="text-xs md:text-sm">Cancellation Reason</Label>
                                <Textarea
                                  id="reason"
                                  value={cancelReason}
                                  onChange={(e) => setCancelReason(e.target.value)}
                                  placeholder="e.g., Fraudulent customer, Unable to reach location, etc."
                                  rows={3}
                                  className="text-xs md:text-sm"
                                />
                              </div>
                              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <Button
                                  onClick={() => cancelOrder(booking.id, booking.email, cancelReason)}
                                  disabled={actionLoading === booking.id}
                                  variant="destructive"
                                  className="flex-1 text-xs md:text-sm h-8 md:h-10"
                                >
                                  {actionLoading === booking.id ? 'Cancelling...' : 'Confirm Cancel'}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setCancelReason('');
                                    setSelectedBooking(null);
                                  }}
                                  className="flex-1 text-xs md:text-sm h-8 md:h-10"
                                >
                                  Close
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}

                    {/* Status Information for Completed/Cancelled Orders */}
                    {(isCompleted || isCancelled) && (
                      <div className="pt-2 border-t border-gray-200">
                        {isCompleted && booking.completed_at && (
                          <div className="text-xs text-green-600 font-medium">
                            ✓ Completed on {format(new Date(booking.completed_at), 'MMM dd, yyyy')}
                          </div>
                        )}
                        {isCancelled && booking.cancelled_at && (
                          <div className="text-xs text-red-600">
                            <div className="font-medium">
                              ✗ Cancelled on {format(new Date(booking.cancelled_at), 'MMM dd, yyyy')}
                            </div>
                            {booking.cancellation_reason && (
                              <div className="mt-1 text-red-500 line-clamp-2">
                                Reason: {booking.cancellation_reason}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Booked on {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsDashboard;

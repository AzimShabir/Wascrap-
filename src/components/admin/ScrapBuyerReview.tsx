import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Phone, Mail, MapPin, CreditCard, Car, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ScrapBuyer {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  pan_card: string;
  address: string;
  car_number: string;
  city: string;
  state: string;
  pincode: string;
  is_verified: boolean;
  created_at: string;
}

const ScrapBuyerReview = () => {
  const [buyers, setBuyers] = useState<ScrapBuyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const { data, error } = await supabase
        .from('scrap_buyers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBuyers(data || []);
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

  const handleApprove = async (buyerId: string, buyerEmail: string) => {
    setActionLoading(buyerId);
    try {
      // Get buyer details first
      const buyer = buyers.find(b => b.id === buyerId);
      if (!buyer) throw new Error("Buyer not found");

      const { error } = await supabase
        .from('scrap_buyers')
        .update({ is_verified: true })
        .eq('id', buyerId);

      if (error) throw error;

      // Send approval email
      await supabase.functions.invoke('send-notification-email', {
        body: {
          to: buyerEmail,
          type: 'buyer_approved',
          buyerName: buyer.full_name
        }
      });

      toast({
        title: "Success",
        description: "Scrap buyer approved and notified via email!",
      });

      fetchBuyers();
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

  const handleReject = async (buyerId: string, buyerEmail: string, reason?: string) => {
    setActionLoading(buyerId);
    try {
      // Get buyer details first
      const buyer = buyers.find(b => b.id === buyerId);
      if (!buyer) throw new Error("Buyer not found");

      const { error } = await supabase
        .from('scrap_buyers')
        .update({ is_verified: false })
        .eq('id', buyerId);

      if (error) throw error;

      // Send rejection email
      await supabase.functions.invoke('send-notification-email', {
        body: {
          to: buyerEmail,
          type: 'buyer_rejected',
          buyerName: buyer.full_name,
          reason: reason || 'Application did not meet current requirements'
        }
      });

      toast({
        title: "Success",
        description: "Scrap buyer rejected and notified via email.",
      });

      fetchBuyers();
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

  const pendingBuyers = buyers.filter(b => !b.is_verified);
  const verifiedBuyers = buyers.filter(b => b.is_verified);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Reviews ({pendingBuyers.length})
          </CardTitle>
          <CardDescription>
            Review and approve scrap buyer applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingBuyers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No pending reviews</p>
          ) : (
            <div className="space-y-4">
              {pendingBuyers.map((buyer) => (
                <Card key={buyer.id} className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{buyer.full_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{buyer.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{buyer.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">PAN Card</p>
                            <p className="font-medium">{buyer.pan_card}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle</p>
                            <p className="font-medium">{buyer.car_number || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-medium">
                              {buyer.address}, {buyer.city}, {buyer.state} - {buyer.pincode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleApprove(buyer.id, buyer.email)}
                        disabled={actionLoading === buyer.id}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(buyer.id, buyer.email)}
                        disabled={actionLoading === buyer.id}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Verified Buyers ({verifiedBuyers.length})
          </CardTitle>
          <CardDescription>
            List of approved scrap buyers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verifiedBuyers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No verified buyers yet</p>
          ) : (
            <div className="space-y-2">
              {verifiedBuyers.map((buyer) => (
                <div key={buyer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{buyer.full_name}</p>
                      <p className="text-sm text-muted-foreground">{buyer.email}</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScrapBuyerReview;

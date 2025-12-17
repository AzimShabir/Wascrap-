import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, CreditCard, Phone, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

interface ScrapBuyerAuthProps {
  onSuccess: () => void;
}

const ScrapBuyerAuth = ({ onSuccess }: ScrapBuyerAuthProps) => {
  const [step, setStep] = useState<'auth' | 'otp' | 'details'>('auth');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    panCard: '',
    address: '',
    carNumber: '',
    city: '',
    state: 'Jammu and Kashmir',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();

  const indianStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(username, password);
      
      if (error) throw error;

      // Check if user is a scrap buyer
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: scrapBuyer } = await supabase
          .from('scrap_buyers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (scrapBuyer) {
          toast({ title: "Success", description: "Signed in successfully!" });
          onSuccess();
        } else {
          toast({
            title: "Not a Scrap Buyer",
            description: "This account is not registered as a scrap buyer.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        }
      }
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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || username.length < 3 || username.length > 30) {
      toast({
        title: "Invalid Username",
        description: "Username must be between 3-30 characters",
        variant: "destructive",
      });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast({
        title: "Invalid Username",
        description: "Username can only contain letters, numbers, and underscores",
        variant: "destructive",
      });
      return;
    }

    if (!email || !password || password.length < 6) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid email and password (min 6 characters)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Check if username already exists
      try {
        const { data: existingProfile } = await supabase
          .from('profiles' as any)
          .select('username')
          .eq('username', username)
          .maybeSingle();

        if (existingProfile) {
          toast({
            title: "Username Taken",
            description: "This username is already in use.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Profile check failed, proceeding');
      }

      // Send OTP via edge function
      const { data, error } = await supabase.functions.invoke('send-otp-email', {
        body: { email, type: 'buyer' }
      });

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
      setStep('otp');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, otp, username, password }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: "OTP Verified",
        description: "Please complete your registration",
      });
      setStep('details');
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

  const registerScrapBuyer = async () => {
    if (!fullName || !phone || phone.length !== 10 || !formData.panCard || !formData.address || !formData.city || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Sign in with the created account
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) throw signInError;

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const phoneNumber = phone.startsWith('+91') ? phone : `+91${phone}`;

      const { error } = await supabase
        .from('scrap_buyers')
        .insert([{
          user_id: user.id,
          phone: phoneNumber,
          full_name: fullName,
          pan_card: formData.panCard.toUpperCase(),
          address: formData.address,
          car_number: formData.carNumber || null,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }]);

      if (error) throw error;

      toast({
        title: "Registration Successful",
        description: "Your account is under review. You'll be notified once approved.",
      });
      onSuccess();
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

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Truck className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Scrap Buyer <span className="text-blue-600">Portal</span>
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Register or sign in as a scrap buyer
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {step === 'auth' && (
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-signin-username">Username or Email</Label>
                  <Input
                    id="buyer-signin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 md:h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-signin-password">Password</Label>
                  <Input
                    id="buyer-signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 md:h-12"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-10 md:h-12" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-username">Username</Label>
                  <Input
                    id="buyer-username"
                    type="text"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="h-10 md:h-12"
                    minLength={3}
                    maxLength={30}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email</Label>
                  <Input
                    id="buyer-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 md:h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-password">Password</Label>
                  <Input
                    id="buyer-password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 md:h-12"
                    minLength={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-10 md:h-12" disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="space-y-2 text-center">
              <Label>Enter OTP</Label>
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a 6-digit code to {email}
              </p>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-10 md:w-12 md:h-12" />
                    <InputOTPSlot index={1} className="w-10 h-10 md:w-12 md:h-12" />
                    <InputOTPSlot index={2} className="w-10 h-10 md:w-12 md:h-12" />
                    <InputOTPSlot index={3} className="w-10 h-10 md:w-12 md:h-12" />
                    <InputOTPSlot index={4} className="w-10 h-10 md:w-12 md:h-12" />
                    <InputOTPSlot index={5} className="w-10 h-10 md:w-12 md:h-12" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <Button type="submit" className="w-full h-10 md:h-12" disabled={loading || otp.length !== 6}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => { setStep('auth'); setOtp(''); }}
              className="w-full"
            >
              Change Email
            </Button>
          </form>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground">Provide your business details</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="panCard">PAN Card Number *</Label>
                <Input
                  id="panCard"
                  value={formData.panCard}
                  onChange={(e) => setFormData({ ...formData, panCard: e.target.value.toUpperCase() })}
                  placeholder="ABCDE1234F"
                  className="uppercase"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address">Complete Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Shop number, Street, Area"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    placeholder="6-digit"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="state">State *</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="carNumber">Vehicle Number (Optional)</Label>
                <Input
                  id="carNumber"
                  value={formData.carNumber}
                  onChange={(e) => setFormData({ ...formData, carNumber: e.target.value.toUpperCase() })}
                  placeholder="XX00XX0000"
                  className="uppercase"
                />
              </div>
            </div>

            <Button onClick={registerScrapBuyer} className="w-full h-10 md:h-12" disabled={loading}>
              {loading ? "Registering..." : "Complete Registration"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScrapBuyerAuth;

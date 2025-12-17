
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { signInWithGoogle, auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { User, Mail, MapPin, Car, CreditCard, Phone } from 'lucide-react';

interface ScrapBuyerAuthProps {
  onSuccess: () => void;
}

const ScrapBuyerAuth = ({ onSuccess }: ScrapBuyerAuthProps) => {
  const [step, setStep] = useState<'auth' | 'otp' | 'details' | 'google-details'>('auth');
  const [authMethod, setAuthMethod] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [formData, setFormData] = useState({
    panCard: '',
    address: '',
    carNumber: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.providerData[0]?.providerId === 'google.com') {
        setGoogleUser(user);
        setFullName(user.displayName || '');
        setEmail(user.email || '');
        setStep('google-details');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is a scrap buyer
      const { data: scrapBuyer } = await supabase
        .from('scrap_buyers')
        .select('*')
        .eq('email', email)
        .single();

      if (scrapBuyer) {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        onSuccess();
      } else {
        toast({
          title: "Access Denied",
          description: "This account is not registered as a scrap buyer.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/bookings-dashboard`,
          data: {
            full_name: fullName,
            phone: phone,
            user_type: 'scrap_buyer'
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Verification Email Sent",
        description: "Please check your email and click the verification link, or enter the OTP below.",
      });
      setOtpSent(true);
      setStep('otp');
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

  const handleOTPVerification = async () => {
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
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });

      if (error) throw error;

      setStep('details');
      toast({
        title: "Email Verified",
        description: "Please complete your business profile",
      });
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

  const handleSkipOTP = async () => {
    toast({
      title: "Please verify your email",
      description: "Check your email and click the verification link to continue",
    });
    
    // Check if already verified
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email_confirmed_at) {
      setStep('details');
    }
  };

  const registerScrapBuyer = async () => {
    if (!formData.panCard) {
      toast({
        title: "Missing Information",
        description: "PAN Card number is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('scrap_buyers')
        .insert([{
          phone,
          full_name: fullName,
          pan_card: formData.panCard.toUpperCase(),
          email: email,
          address: formData.address,
          car_number: formData.carNumber,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }]);

      if (error) throw error;

      toast({
        title: "Registration Successful",
        description: "Your scrap buyer account has been created!",
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Check if user already exists in Firebase
      const { data: existingUser } = await supabase.functions.invoke('firebase-auth', {
        body: { action: 'get', uid: user.uid }
      });

      if (existingUser?.data) {
        toast({
          title: "Welcome back!",
          description: "Signed in successfully with Google!",
        });
        onSuccess();
      } else {
        // New user, proceed to details form
        setGoogleUser(user);
        setFullName(user.displayName || '');
        setEmail(user.email || '');
        setStep('google-details');
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegistration = async () => {
    if (!googleUser || !phone || !formData.panCard) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Store in Firebase
      const userData = {
        uid: googleUser.uid,
        email: googleUser.email,
        displayName: googleUser.displayName,
        photoURL: googleUser.photoURL,
        phoneNumber: phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        panCard: formData.panCard.toUpperCase(),
        carNumber: formData.carNumber,
        verified: false,
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase.functions.invoke('firebase-auth', {
        body: { action: 'create', userData }
      });

      if (error) throw error;

      toast({
        title: "Registration Successful",
        description: "Your scrap seller account has been created in Firebase!",
      });
      onSuccess();
    } catch (error: any) {
      console.error('Firebase registration error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">Scrap Buyer Portal</CardTitle>
        <CardDescription className="text-green-100 text-sm md:text-base">
          {step === 'auth' && 'Sign in or create your business account'}
          {step === 'otp' && 'Verify your email address'}
          {step === 'details' && 'Complete your business profile'}
          {step === 'google-details' && 'Complete your scrap seller profile'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {step === 'auth' && (
          <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as 'signin' | 'signup')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="text-xs md:text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-xs md:text-sm">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="flex items-center text-sm md:text-base">
                    <Mail className="w-4 h-4 mr-2 text-green-600" />
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 md:h-12 text-sm md:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm md:text-base">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 md:h-12 text-sm md:text-base"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-10 md:h-12 text-sm md:text-base">
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleSignIn} 
                  disabled={loading} 
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Signing In...' : 'Continue with Google'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center text-sm md:text-base">
                      <User className="w-4 h-4 mr-2 text-green-600" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center text-sm md:text-base">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXXXXXXX"
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center text-sm md:text-base">
                    <Mail className="w-4 h-4 mr-2 text-green-600" />
                    Email *
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 md:h-12 text-sm md:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm md:text-base">Password *</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 md:h-12 text-sm md:text-base"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-10 md:h-12 text-sm md:text-base">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleSignIn} 
                  disabled={loading} 
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Signing Up...' : 'Sign up with Google'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm md:text-base text-gray-600 mb-4">
                We've sent a verification email to <strong>{email}</strong>
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-4">
                You can either click the link in your email or enter the 6-digit code below:
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm md:text-base">Enter OTP (Optional)</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleOTPVerification} 
                  disabled={loading || otp.length !== 6} 
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleSkipOTP} 
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  I'll verify via email link
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="panCard" className="flex items-center text-sm md:text-base">
                <CreditCard className="w-4 h-4 mr-2 text-green-600" />
                PAN Card Number *
              </Label>
              <Input
                id="panCard"
                value={formData.panCard}
                onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                maxLength={10}
                className="h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center text-sm md:text-base">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Business Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your business address"
                className="h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm md:text-base">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm md:text-base">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-sm md:text-base">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="123456"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carNumber" className="flex items-center text-sm md:text-base">
                <Car className="w-4 h-4 mr-2 text-green-600" />
                Vehicle Number
              </Label>
              <Input
                id="carNumber"
                value={formData.carNumber}
                onChange={(e) => handleInputChange('carNumber', e.target.value.toUpperCase())}
                placeholder="MH12AB1234"
                className="h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            <Button onClick={registerScrapBuyer} disabled={loading} className="w-full h-10 md:h-12 text-sm md:text-base">
              {loading ? 'Creating Profile...' : 'Complete Registration'}
            </Button>
          </div>
        )}

        {step === 'google-details' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mx-auto mb-2">
                {googleUser?.photoURL ? (
                  <img 
                    src={googleUser.photoURL} 
                    alt="Profile" 
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{googleUser?.displayName}</h3>
              <p className="text-sm text-gray-600">{googleUser?.email}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="google-phone" className="flex items-center text-sm md:text-base">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                Phone Number *
              </Label>
              <Input
                id="google-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXXXXXXX"
                className="h-10 md:h-12 text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="google-panCard" className="flex items-center text-sm md:text-base">
                <CreditCard className="w-4 h-4 mr-2 text-green-600" />
                PAN Card Number *
              </Label>
              <Input
                id="google-panCard"
                value={formData.panCard}
                onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                maxLength={10}
                className="h-10 md:h-12 text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="google-address" className="flex items-center text-sm md:text-base">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Business Address
              </Label>
              <Input
                id="google-address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your business address"
                className="h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="google-city" className="text-sm md:text-base">City</Label>
                <Input
                  id="google-city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-state" className="text-sm md:text-base">State</Label>
                <Input
                  id="google-state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-pincode" className="text-sm md:text-base">Pincode</Label>
                <Input
                  id="google-pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="123456"
                  className="h-10 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="google-carNumber" className="flex items-center text-sm md:text-base">
                <Car className="w-4 h-4 mr-2 text-green-600" />
                Vehicle Number
              </Label>
              <Input
                id="google-carNumber"
                value={formData.carNumber}
                onChange={(e) => handleInputChange('carNumber', e.target.value.toUpperCase())}
                placeholder="MH12AB1234"
                className="h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            <Button onClick={handleGoogleRegistration} disabled={loading} className="w-full h-10 md:h-12 text-sm md:text-base">
              {loading ? 'Creating Profile...' : 'Complete Registration with Firebase'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScrapBuyerAuth;

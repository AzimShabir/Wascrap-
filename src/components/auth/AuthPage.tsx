import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Recycle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import ScrapBuyerAuth from './ScrapBuyerAuth';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(username, password);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      navigate('/');
    }
    setLoading(false);
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
            description: "This username is already in use. Please choose another.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Profile check failed, proceeding with signup');
      }

      // Send OTP via edge function
      const { data, error } = await supabase.functions.invoke('send-otp-email', {
        body: { email, type: 'customer' }
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
        title: "Account Created",
        description: "Your account has been created successfully! Signing you in...",
      });

      // Sign in the user
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        toast({
          title: "Account Created",
          description: "Please sign in with your credentials.",
        });
        setStep('form');
        setOtp('');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScrapBuyerSuccess = () => {
    toast({
      title: "Success",
      description: "Logged in as scrap buyer!",
    });
    navigate('/bookings-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* Regular User Authentication */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="relative">
                    <Recycle className="w-6 md:w-8 h-6 md:h-8 text-white" />
                    <Leaf className="w-3 md:w-4 h-3 md:h-4 text-green-200 absolute -top-1 -right-1" />
                  </div>
                </div>
              </div>
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold">
              Customer <span className="text-green-600">Portal</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Sign in or create an account to book pickup services
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="text-xs md:text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-xs md:text-sm" onClick={() => setStep('form')}>Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-username">Username or Email</Label>
                    <Input
                      id="signin-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-10 md:h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
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
                {step === 'form' ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="Choose a unique username"
                        className="h-10 md:h-12"
                        minLength={3}
                        maxLength={30}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 md:h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 md:h-12"
                        minLength={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-10 md:h-12" disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                  </form>
                ) : (
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
                      {loading ? 'Verifying...' : 'Verify & Create Account'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => { setStep('form'); setOtp(''); }}
                      className="w-full"
                    >
                      Change Email
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Scrap Buyer Authentication */}
        <div className="w-full">
          <ScrapBuyerAuth onSuccess={handleScrapBuyerSuccess} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

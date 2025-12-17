
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
import ScrapBuyerAuth from './ScrapBuyerAuth';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, fullName, phone);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Verification Email Sent",
        description: "Please check your email and click the verification link to activate your account.",
      });
    }
    setLoading(false);
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
                <TabsTrigger value="signup" className="text-xs md:text-sm">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 md:h-12 text-sm md:text-base" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm md:text-base">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 md:h-12 text-sm md:text-base"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 md:h-12 text-sm md:text-base" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
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

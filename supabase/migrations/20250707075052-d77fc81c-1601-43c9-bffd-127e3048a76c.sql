
-- Create a table for scrap buyers with PAN card details
CREATE TABLE public.scrap_buyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  pan_card TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for scrap buyers
ALTER TABLE public.scrap_buyers ENABLE ROW LEVEL SECURITY;

-- Create policies for scrap buyers
CREATE POLICY "Scrap buyers can view their own profile" 
  ON public.scrap_buyers 
  FOR SELECT 
  USING (phone = auth.jwt() ->> 'phone');

CREATE POLICY "Scrap buyers can update their own profile" 
  ON public.scrap_buyers 
  FOR UPDATE 
  USING (phone = auth.jwt() ->> 'phone');

CREATE POLICY "Anyone can insert scrap buyer profile" 
  ON public.scrap_buyers 
  FOR INSERT 
  WITH CHECK (true);

-- Create a table for OTP verification
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for OTP verifications
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP verifications
CREATE POLICY "Anyone can insert OTP" 
  ON public.otp_verifications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update OTP for verification" 
  ON public.otp_verifications 
  FOR UPDATE 
  WITH CHECK (true);

CREATE POLICY "Anyone can select OTP for verification" 
  ON public.otp_verifications 
  FOR SELECT 
  USING (true);

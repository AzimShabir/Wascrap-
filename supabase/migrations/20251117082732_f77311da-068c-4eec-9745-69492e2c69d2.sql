-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Add user_id to scrap_buyers and rename verified to is_verified
ALTER TABLE public.scrap_buyers 
  ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.scrap_buyers 
  RENAME COLUMN verified TO is_verified;

-- Update scrap_buyers RLS policies
DROP POLICY IF EXISTS "Anyone can insert scrap buyer profile" ON public.scrap_buyers;
DROP POLICY IF EXISTS "Scrap buyers can update their own profile" ON public.scrap_buyers;
DROP POLICY IF EXISTS "Scrap buyers can view their own profile" ON public.scrap_buyers;

-- Allow authenticated users to insert their own profile (is_verified defaults to false)
CREATE POLICY "Authenticated users can insert own profile"
ON public.scrap_buyers
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile but not is_verified
CREATE POLICY "Users can update own profile except verification"
ON public.scrap_buyers
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND is_verified = (SELECT is_verified FROM public.scrap_buyers WHERE id = scrap_buyers.id));

-- Only admins can update is_verified status
CREATE POLICY "Admins can update verification status"
ON public.scrap_buyers
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.scrap_buyers
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.scrap_buyers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update bookings RLS policies to only allow verified scrap buyers
DROP POLICY IF EXISTS "Scrap buyers can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Scrap buyers can update booking status" ON public.bookings;

CREATE POLICY "Verified scrap buyers can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.scrap_buyers
    WHERE user_id = auth.uid()
      AND is_verified = true
  )
);

CREATE POLICY "Verified scrap buyers can update booking status"
ON public.bookings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.scrap_buyers
    WHERE user_id = auth.uid()
      AND is_verified = true
  )
);

-- Update notifications table RLS
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;

CREATE POLICY "Admins can insert notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
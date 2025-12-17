
-- Add email and additional details to scrap_buyers table
ALTER TABLE public.scrap_buyers 
ADD COLUMN email TEXT,
ADD COLUMN address TEXT,
ADD COLUMN car_number TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN pincode TEXT;

-- Add status tracking and completion fields to bookings table
ALTER TABLE public.bookings 
ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN cancellation_reason TEXT,
ADD COLUMN completed_by UUID REFERENCES public.scrap_buyers(id);

-- Create notifications table for email notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) NOT NULL,
  scrap_buyer_id UUID REFERENCES public.scrap_buyers(id),
  notification_type TEXT NOT NULL, -- 'order_completed', 'order_cancelled', etc.
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Scrap buyers can view their notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (scrap_buyer_id IN (SELECT id FROM public.scrap_buyers WHERE phone = auth.jwt() ->> 'phone'));

CREATE POLICY "Anyone can insert notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Update RLS policies for scrap_buyers to include email access
DROP POLICY IF EXISTS "Scrap buyers can view their own profile" ON public.scrap_buyers;
CREATE POLICY "Scrap buyers can view their own profile" 
  ON public.scrap_buyers 
  FOR SELECT 
  USING (phone = auth.jwt() ->> 'phone' OR email = auth.jwt() ->> 'email');

-- Allow scrap buyers to view all bookings (for order management)
CREATE POLICY "Scrap buyers can view all bookings" 
  ON public.bookings 
  FOR SELECT 
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.scrap_buyers WHERE phone = auth.jwt() ->> 'phone' OR email = auth.jwt() ->> 'email'));

-- Allow scrap buyers to update booking status
CREATE POLICY "Scrap buyers can update booking status" 
  ON public.bookings 
  FOR UPDATE 
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.scrap_buyers WHERE phone = auth.jwt() ->> 'phone' OR email = auth.jwt() ->> 'email'));


-- Create table for job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for product bookings
CREATE TABLE public.product_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  deadline DATE,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for job applications (public can insert, only authenticated users can view their own)
CREATE POLICY "Anyone can submit job applications" 
  ON public.job_applications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Create policies for product bookings
CREATE POLICY "Users can create bookings" 
  ON public.product_bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can view their own bookings" 
  ON public.product_bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

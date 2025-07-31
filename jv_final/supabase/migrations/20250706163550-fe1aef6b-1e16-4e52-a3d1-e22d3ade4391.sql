
-- Create admin_users table to manage admin access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true
);

-- Insert the initial admin user
INSERT INTO public.admin_users (email) VALUES ('abhivanth3@gmail.com');

-- Add user status column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update job_applications table to add status and resume_url
ALTER TABLE public.job_applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.job_applications ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_users table
CREATE POLICY "Admin users can view admin list" 
  ON public.admin_users 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  ));

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email AND is_active = true
  );
$$;

-- Create policies for admin access to all tables
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Admins can update user profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Admins can view all job applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Admins can update job applications" 
  ON public.job_applications 
  FOR UPDATE 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Admins can view all product bookings" 
  ON public.product_bookings 
  FOR SELECT 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Admins can update product bookings" 
  ON public.product_bookings 
  FOR UPDATE 
  USING (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));


-- Drop existing tables that are causing permission issues
DROP TABLE IF EXISTS public.product_bookings CASCADE;
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Drop the existing admin function
DROP FUNCTION IF EXISTS public.is_admin(text);

-- Recreate profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text,
  role text DEFAULT 'user',
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Recreate admin_users table
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid
);

-- Recreate product_bookings table
CREATE TABLE public.product_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  user_email text,
  user_name text,
  user_phone text,
  product_id integer NOT NULL,
  product_name text NOT NULL,
  quantity integer DEFAULT 1,
  deadline date,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Recreate job_applications table
CREATE TABLE public.job_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  education text NOT NULL,
  experience text,
  resume_url text,
  additional_info text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Recreate the admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email AND is_active = true
  );
$$;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to profiles" ON public.profiles FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create RLS policies for admin_users
CREATE POLICY "Allow admin access to admin_users" ON public.admin_users FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create RLS policies for product_bookings
CREATE POLICY "Allow public read access to bookings" ON public.product_bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert to bookings" ON public.product_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to bookings" ON public.product_bookings FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create RLS policies for job_applications
CREATE POLICY "Allow public read access to applications" ON public.job_applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert to applications" ON public.job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to applications" ON public.job_applications FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Insert admin users
INSERT INTO public.admin_users (email) VALUES 
('abhivanth3@gmail.com'),
('abhicoder39@gmail.com');

-- Insert some sample profiles
INSERT INTO public.profiles (email, role) VALUES 
('abhivanth3@gmail.com', 'admin'),
('abhicoder39@gmail.com', 'admin');

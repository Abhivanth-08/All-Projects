
-- Fix the admin function to properly check admin status
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

-- Add missing RLS policies for admin access
CREATE POLICY "Admins can insert into admin_users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())));

-- Fix profiles policies to ensure proper data access
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())) OR 
    auth.uid() = id
  );

-- Ensure admin users table has proper access
DROP POLICY IF EXISTS "Admin users can view admin list" ON public.admin_users;
CREATE POLICY "Admin users can view admin list" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())) OR
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Add policies for admin management of bookings
DROP POLICY IF EXISTS "Admins can view all product bookings" ON public.product_bookings;
CREATE POLICY "Admins can view all product bookings" 
  ON public.product_bookings 
  FOR SELECT 
  USING (
    public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())) OR
    auth.uid() = user_id
  );

-- Add policies for admin management of job applications
DROP POLICY IF EXISTS "Admins can view all job applications" ON public.job_applications;
CREATE POLICY "Admins can view all job applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (
    public.is_admin((SELECT email FROM auth.users WHERE id = auth.uid())) OR
    auth.uid() IS NOT NULL
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;


-- First, let's add the missing columns to the profiles table to store additional user information
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age integer;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mobile_number text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS district text;

-- Create a trigger function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, age, mobile_number, company_name, country, state, district)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'name',
    CASE 
      WHEN new.raw_user_meta_data ->> 'age' ~ '^[0-9]+$' 
      THEN (new.raw_user_meta_data ->> 'age')::integer 
      ELSE NULL 
    END,
    new.raw_user_meta_data ->> 'mobile_number',
    new.raw_user_meta_data ->> 'company_name',
    new.raw_user_meta_data ->> 'country',
    new.raw_user_meta_data ->> 'state',
    new.raw_user_meta_data ->> 'district'
  );
  RETURN new;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update product_bookings to reference profiles table
ALTER TABLE public.product_bookings 
ADD COLUMN IF NOT EXISTS profile_id uuid REFERENCES public.profiles(id);

-- Update job_applications to reference profiles table  
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS profile_id uuid REFERENCES public.profiles(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_bookings_profile_id ON public.product_bookings(profile_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_profile_id ON public.job_applications(profile_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

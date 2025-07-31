
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('Checking admin status for user:', user?.email);
      
      if (!user?.email) {
        console.log('No user email found');
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // First try to call the RPC function
        const { data, error } = await supabase.rpc('is_admin', {
          user_email: user.email
        });

        console.log('Admin RPC response:', { data, error });

        if (error) {
          console.error('Error checking admin status:', error);
          
          // Fallback: check directly from admin_users table
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', user.email)
            .eq('is_active', true)
            .single();

          console.log('Direct admin check:', { adminData, adminError });
          
          if (adminError) {
            console.error('Direct admin check failed:', adminError);
            setIsAdmin(false);
          } else {
            setIsAdmin(!!adminData);
          }
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface User {
  id: string;
  email: string;
  created_at: string;
  role: string;
  status: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      setError(null);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Users fetch response:', { data, error });

      if (error) {
        console.error('Error fetching users:', error);
        setError(`Failed to fetch users: ${error.message}`);
        toast({
          title: "Error",
          description: `Failed to fetch users: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Users fetched successfully:', data?.length);
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      console.log('Updating user status:', { userId, newStatus });
      
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user status:', error);
        toast({
          title: "Error",
          description: `Failed to update user status: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
        });
        fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const promoteToAdmin = async (userId: string, userEmail: string) => {
    try {
      console.log('Promoting user to admin:', { userId, userEmail });
      
      // Add to admin_users table
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({ email: userEmail });

      if (adminError) {
        console.error('Error promoting to admin:', adminError);
        toast({
          title: "Error",
          description: `Failed to promote user to admin: ${adminError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Update role in profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating profile role:', profileError);
      }

      toast({
        title: "Success",
        description: "User promoted to admin successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error('Error promoting to admin:', error);
    }
  };

  const removeUserFrontend = (id: string) => {
    setUsers(users => users.filter(u => u.id !== id));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <AnimatedButton 
              onClick={fetchUsers}
              className="bg-violet hover:bg-violet-dark text-white"
            >
              Retry
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management ({users.length} users)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{format(new Date(user.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                    {user.role || 'user'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status || 'active'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <AnimatedButton
                      size="sm"
                      variant={user.status === 'active' ? 'destructive' : 'default'}
                      onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      animationStyle="pulse"
                      className="bg-violet hover:bg-violet-dark text-white border-0"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </AnimatedButton>
                    {user.role !== 'admin' && (
                      <AnimatedButton
                        size="sm"
                        variant="outline"
                        onClick={() => promoteToAdmin(user.id, user.email)}
                        animationStyle="glowing"
                        className="bg-green-600 hover:bg-green-700 text-white border-0"
                      >
                        Promote to Admin
                      </AnimatedButton>
                    )}
                    <AnimatedButton
                      size="sm"
                      variant="outline"
                      onClick={() => removeUserFrontend(user.id)}
                      animationStyle="pulse"
                      className="bg-gray-400 hover:bg-gray-600 text-white border-0"
                    >
                      Remove
                    </AnimatedButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagement;

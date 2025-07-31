
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, Briefcase, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalUsers: number;
  totalBookings: number;
  totalApplications: number;
  pendingBookings: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalBookings: 0,
    totalApplications: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching admin stats...');
      setError(null);
      
      // Fetch all statistics from the newly created tables
      const [profilesResponse, bookingsResponse, applicationsResponse, pendingBookingsResponse] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('product_bookings').select('id', { count: 'exact' }),
        supabase.from('job_applications').select('id', { count: 'exact' }),
        supabase.from('product_bookings').select('id', { count: 'exact' }).eq('status', 'pending'),
      ]);

      console.log('Stats responses:', {
        profiles: profilesResponse,
        bookings: bookingsResponse,
        applications: applicationsResponse,
        pending: pendingBookingsResponse
      });

      // Check for any errors
      const errors = [profilesResponse.error, bookingsResponse.error, applicationsResponse.error, pendingBookingsResponse.error].filter(Boolean);
      
      if (errors.length > 0) {
        console.error('Errors in stats fetch:', errors);
        setError(`Failed to fetch some statistics: ${errors.map(e => e.message).join(', ')}`);
      }

      setStats({
        totalUsers: profilesResponse.count || 0,
        totalBookings: bookingsResponse.count || 0,
        totalApplications: applicationsResponse.count || 0,
        pendingBookings: pendingBookingsResponse.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Unexpected error occurred while fetching stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="bg-gray-200 h-20"></CardHeader>
            <CardContent className="bg-gray-100 h-16"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchStats}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Job Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="font-semibold">{stats.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Bookings</span>
              <span className="font-semibold text-orange-600">{stats.pendingBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Applications</span>
              <span className="font-semibold">{stats.totalApplications}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;

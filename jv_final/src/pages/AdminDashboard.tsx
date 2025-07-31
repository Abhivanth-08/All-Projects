
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, Briefcase, BarChart3 } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import JobApplicationManagement from '@/components/admin/JobApplicationManagement';
import AdminStats from '@/components/admin/AdminStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
              Manage users, bookings, and applications
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100">
              <TabsTrigger 
                value="stats" 
                className="flex items-center gap-2 bg-violet-600 text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white hover:bg-violet-700"
              >
                <BarChart3 size={20} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center gap-2 bg-violet-600 text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white hover:bg-violet-700"
              >
                <Users size={20} />
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="flex items-center gap-2 bg-violet-600 text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white hover:bg-violet-700"
              >
                <Package size={20} />
                Bookings
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="flex items-center gap-2 bg-violet-600 text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white hover:bg-violet-700"
              >
                <Briefcase size={20} />
                Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <AdminStats />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="applications">
              <JobApplicationManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

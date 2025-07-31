
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  education: string;
  experience: string;
  resume_url: string;
  additional_info: string;
  status: string;
  created_at: string;
  profiles?: {
    name: string;
    age: number;
    mobile_number: string;
    company_name: string;
    country: string;
    state: string;
    district: string;
    email: string;
  };
}

const JobApplicationManagement = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      console.log('Fetching job applications...');
      setError(null);
      
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          profiles (
            name,
            age,
            mobile_number,
            company_name,
            country,
            state,
            district,
            email
          )
        `)
        .order('created_at', { ascending: false });

      console.log('Job applications fetch response:', { data, error });

      if (error) {
        console.error('Error fetching applications:', error);
        setError(`Failed to fetch job applications: ${error.message}`);
        toast({
          title: "Error",
          description: `Failed to fetch job applications: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Job applications fetched successfully:', data?.length);
        setApplications(data || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      console.log('Updating application status:', { applicationId, newStatus });
      
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) {
        console.error('Error updating application status:', error);
        toast({
          title: "Error",
          description: `Failed to update application status: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Application marked as ${newStatus}`,
        });
        fetchApplications();
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const removeApplicationFrontend = (id: string) => {
    setApplications(applications => applications.filter(app => app.id !== id));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Application Management</CardTitle>
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
          <CardTitle>Job Application Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <AnimatedButton 
              onClick={fetchApplications}
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
        <CardTitle>Job Application Management ({applications.length} applications)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{application.profiles?.name || application.name}</p>
                    <p className="text-sm text-gray-500">{application.profiles?.email || application.email}</p>
                    <p className="text-sm text-gray-500">{application.profiles?.mobile_number || application.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{application.position}</TableCell>
                <TableCell>{application.education}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      application.status === 'shortlisted' ? 'default' : 
                      application.status === 'rejected' ? 'destructive' : 
                      application.status === 'reviewed' ? 'secondary' :
                      'outline'
                    }
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    <Dialog>
                      <DialogTrigger asChild>
                        <AnimatedButton
                          size="sm"
                          animationStyle="glowing"
                          className="bg-violet-600 hover:bg-violet-700 text-white border-0 mb-1"
                        >
                          <Eye size={16} className="mr-1" />
                          View Details
                        </AnimatedButton>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg bg-white text-black border border-gray-200">
                        <DialogHeader>
                          <DialogTitle className="text-black">Applicant & Application Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 max-h-96 overflow-y-auto text-black">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Personal Information</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Name:</span> {application.profiles?.name || application.name}</p>
                              <p><span className="font-medium">Age:</span> {application.profiles?.age || 'N/A'}</p>
                              <p><span className="font-medium">Email:</span> {application.profiles?.email || application.email}</p>
                              <p><span className="font-medium">Phone:</span> {application.profiles?.mobile_number || application.phone}</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Location Details</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Company:</span> {application.profiles?.company_name || 'N/A'}</p>
                              <p><span className="font-medium">Country:</span> {application.profiles?.country || 'N/A'}</p>
                              <p><span className="font-medium">State:</span> {application.profiles?.state || 'N/A'}</p>
                              <p><span className="font-medium">District:</span> {application.profiles?.district || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Application Details</h4>
                            <div className="space-y-1">
                              <p><span className="font-medium">Position:</span> {application.position}</p>
                              <p><span className="font-medium">Education:</span> {application.education}</p>
                              <p><span className="font-medium">Status:</span> 
                                <Badge variant={application.status === 'shortlisted' ? 'default' : application.status === 'rejected' ? 'destructive' : application.status === 'reviewed' ? 'secondary' : 'outline'} className="ml-2">
                                  {application.status}
                                </Badge>
                              </p>
                              <p><span className="font-medium">Applied On:</span> {format(new Date(application.created_at), 'MMM dd, yyyy HH:mm')}</p>
                            </div>
                          </div>

                          {application.resume_url && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-gray-800 mb-2">Resume</h4>
                              <a 
                                href={application.resume_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-violet-600 hover:text-violet-700 underline"
                              >
                                View Resume
                              </a>
                            </div>
                          )}

                          {application.experience && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-gray-800 mb-2">Experience</h4>
                              <p className="text-sm text-gray-700">{application.experience}</p>
                            </div>
                          )}

                          {application.additional_info && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-gray-800 mb-2">Additional Information</h4>
                              <p className="text-sm text-gray-700">{application.additional_info}</p>
                            </div>
                          )}

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Booking History</h4>
                            <p className="text-sm text-gray-600">Complete booking history will be available once user profile integration is implemented.</p>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Application History</h4>
                            <p className="text-sm text-gray-600">Complete job application history will be available once user profile integration is implemented.</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="flex gap-2 flex-wrap">
                      <AnimatedButton
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                        animationStyle="pulse"
                        className="bg-violet hover:bg-violet-dark text-white border-0 mb-1"
                      >
                        Mark Reviewed
                      </AnimatedButton>
                      <AnimatedButton
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                        animationStyle="float"
                        className="bg-green-500 hover:bg-green-600 text-white border-0 mb-1"
                      >
                        Shortlist
                      </AnimatedButton>
                      <AnimatedButton
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        animationStyle="bounce"
                        className="bg-red-500 hover:bg-red-600 text-white border-0 mb-1"
                      >
                        Reject
                      </AnimatedButton>
                      <AnimatedButton
                        size="sm"
                        onClick={() => removeApplicationFrontend(application.id)}
                        animationStyle="pulse"
                        className="bg-gray-400 hover:bg-gray-600 text-white border-0 mb-1"
                      >
                        Remove
                      </AnimatedButton>
                    </div>
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

export default JobApplicationManagement;

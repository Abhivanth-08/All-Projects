import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const Careers = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    education: '',
    resume: null as File | null,
    additionalInfo: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: 'CNC Machine Operator',
      department: 'Manufacturing',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Full-time',
      description: 'Operate and maintain CNC machines for precision manufacturing.',
      requirements: ['Experience with CNC operations', 'Knowledge of G-code programming', 'Quality control experience']
    },
    {
      id: 2,
      title: 'Quality Control Inspector',
      department: 'Quality Assurance',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Full-time',
      description: 'Inspect manufactured components to ensure quality standards.',
      requirements: ['Knowledge of measurement tools', 'Attention to detail', 'Quality control certification preferred']
    },
    {
      id: 3,
      title: 'Manufacturing Engineer',
      department: 'Engineering',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Full-time',
      description: 'Design and optimize manufacturing processes for efficiency.',
      requirements: ['Mechanical Engineering degree', 'Process optimization experience', 'CAD software proficiency']
    }
  ];

  const scrollToApplySection = () => {
    const applySection = document.getElementById('apply-section');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting job application with data:', formData);
      console.log('Current user:', user);

      // First, try to get the user's profile if they're logged in
      let profileId = null;
      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', user.email)
          .single();

        console.log('Profile lookup result:', { profile, profileError });
        
        if (profile && !profileError) {
          profileId = profile.id;
        }
      }

      // Prepare the application data
      const applicationData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.role,
        education: formData.education,
        experience: formData.experience,
        additional_info: formData.additionalInfo,
        profile_id: profileId,
        status: 'pending'
      };

      console.log('Submitting application data:', applicationData);

      // Submit the job application
      const { data, error } = await supabase
        .from('job_applications')
        .insert([applicationData])
        .select();

      console.log('Job application submission result:', { data, error });

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: "Error",
          description: `Failed to submit application: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Application submitted successfully:', data);
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll review your application and get back to you soon.",
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          education: '',
          resume: null,
          additionalInfo: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">Join Our Team</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Build your career with India's leading precision manufacturing company</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-industrial-blue mb-8 text-center">Current Job Openings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-industrial-lightblue text-industrial-blue">
                        {job.department}
                      </Badge>
                      <span className="text-sm text-gray-500">{job.type}</span>
                    </div>
                    <CardTitle className="text-xl text-industrial-blue">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        {job.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="mb-1">• {req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={scrollToApplySection}
                      className="w-full bg-industrial-blue hover:bg-blue-700"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="apply-section" className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-industrial-blue mb-8 text-center">Apply for a Position</h2>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="cnc-operator" className="text-gray-900 hover:bg-gray-100">CNC Machine Operator</SelectItem>
                      <SelectItem value="quality-inspector" className="text-gray-900 hover:bg-gray-100">Quality Control Inspector</SelectItem>
                      <SelectItem value="manufacturing-engineer" className="text-gray-900 hover:bg-gray-100">Manufacturing Engineer</SelectItem>
                      <SelectItem value="production-supervisor" className="text-gray-900 hover:bg-gray-100">Production Supervisor</SelectItem>
                      <SelectItem value="maintenance-technician" className="text-gray-900 hover:bg-gray-100">Maintenance Technician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="0-1" className="text-gray-900 hover:bg-gray-100">0-1 years</SelectItem>
                      <SelectItem value="1-3" className="text-gray-900 hover:bg-gray-100">1-3 years</SelectItem>
                      <SelectItem value="3-5" className="text-gray-900 hover:bg-gray-100">3-5 years</SelectItem>
                      <SelectItem value="5-10" className="text-gray-900 hover:bg-gray-100">5-10 years</SelectItem>
                      <SelectItem value="10+" className="text-gray-900 hover:bg-gray-100">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="high-school" className="text-gray-900 hover:bg-gray-100">High School</SelectItem>
                      <SelectItem value="diploma" className="text-gray-900 hover:bg-gray-100">Diploma</SelectItem>
                      <SelectItem value="bachelors" className="text-gray-900 hover:bg-gray-100">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters" className="text-gray-900 hover:bg-gray-100">Master's Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume *
                </label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Tell us why you're interested in this position..."
                  rows={4}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-industrial-blue hover:bg-blue-700 text-white py-3"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;

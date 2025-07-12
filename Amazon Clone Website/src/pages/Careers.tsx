
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Users, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Careers = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    education: '',
    experience: '',
    additional_info: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert job application
      const { error: dbError } = await supabase
        .from('job_applications')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'job_application',
          data: formData
        }
      });

      toast({
        title: "Application Submitted Successfully!",
        description: "We've received your application and will contact you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        education: '',
        experience: '',
        additional_info: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">Join Our Team</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Be part of a growing company that values innovation, quality, and employee development</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Available Positions */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Positions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Accounts</h3>
                    <div className="flex space-x-4 mb-4">
                      <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Coimbatore</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      We're looking for an experienced Accounts professional to manage our financial operations and maintain accurate records.
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Commerce degree or equivalent</li>
                        <li>Experience in accounting and finance</li>
                        <li>Knowledge of Tally or similar software</li>
                        <li>Attention to detail and accuracy</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Service Engineer</h3>
                    <div className="flex space-x-4 mb-4">
                      <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Coimbatore</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      We're seeking a skilled Service Engineer to maintain and repair industrial machinery for our clients.
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Diploma or ITI in relevant field</li>
                        <li>Experience in industrial machinery maintenance</li>
                        <li>Troubleshooting skills</li>
                        <li>Willingness to travel for on-site service</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Sales</h3>
                    <div className="flex space-x-4 mb-4">
                      <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Coimbatore</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Join our sales team to help expand our client base and build relationships with industrial customers.
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Any degree</li>
                        <li>Experience in sales or customer relations</li>
                        <li>Strong communication skills</li>
                        <li>Knowledge of industrial products preferred</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Company Benefits */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Join J.V. Enterprises?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
                  <p className="text-gray-600">
                    Work on impactful projects with prestigious institutions and contribute to advancements in manufacturing and engineering.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
                  <p className="text-gray-600">
                    Develop your skills and advance your career with our focus on continuous learning and professional development.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Collaborative Culture</h3>
                  <p className="text-gray-600">
                    Join a supportive team that values innovation, collaboration, and mutual respect in pursuing excellence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className="mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-industrial-blue mb-6 text-center">Apply for a Position</h2>
              
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          required 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          required 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position *</Label>
                        <Select value={formData.position} onValueChange={(value) => handleSelectChange('position', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Accounts">Accounts</SelectItem>
                            <SelectItem value="Service Engineer">Service Engineer</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="education">Education *</Label>
                        <Select value={formData.education} onValueChange={(value) => handleSelectChange('education', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">10th Standard</SelectItem>
                            <SelectItem value="12th">12th Standard</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="ITI">ITI</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                            <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input 
                          id="experience" 
                          name="experience" 
                          value={formData.experience} 
                          onChange={handleChange} 
                          placeholder="Enter years of experience (optional)"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additional_info">Additional Information</Label>
                      <Textarea 
                        id="additional_info" 
                        name="additional_info" 
                        value={formData.additional_info} 
                        onChange={handleChange} 
                        placeholder="Tell us about your skills and why you want to join J.V. Enterprises"
                        rows={5}
                      />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-violet-700 text-black text-lg py-4 font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;

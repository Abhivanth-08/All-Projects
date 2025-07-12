
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, Users, Target, FileText } from 'lucide-react';

const Careers = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your server
    console.log('Form submitted:', formData);
    
    toast({
      title: "Application Submitted",
      description: "We've received your application and will contact you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: '',
      resume: null,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-violet-100 max-w-3xl">
              Be part of a growing company that values innovation, quality, and employee development. Explore career opportunities at J.V. Enterprises.
            </p>
          </div>
        </div>

        {/* Why Join Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Join J.V. Enterprises?</h2>
            
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
        
        {/* Open Positions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Current Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Manufacturing Engineer</h3>
                  <div className="flex space-x-4 mb-4">
                    <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Bangalore</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're looking for an experienced Manufacturing Engineer to join our team and help improve our manufacturing processes and quality control systems.
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>B.Tech/B.E. in Mechanical/Production Engineering</li>
                      <li>3+ years of experience in manufacturing</li>
                      <li>Knowledge of CNC machines and operations</li>
                      <li>Experience with quality control systems</li>
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Service Technician</h3>
                  <div className="flex space-x-4 mb-4">
                    <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Chennai</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're seeking a skilled Service Technician to maintain and repair industrial machinery for our clients across South India.
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Diploma or ITI in relevant field</li>
                      <li>2+ years of experience in industrial machinery maintenance</li>
                      <li>Troubleshooting skills</li>
                      <li>Willingness to travel for on-site service</li>
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Quality Control Specialist</h3>
                  <div className="flex space-x-4 mb-4">
                    <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Bangalore</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join our quality team to ensure all products meet our high standards before delivery to prestigious clients.
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>B.Tech/B.E. in relevant field</li>
                      <li>Experience with quality management systems</li>
                      <li>Knowledge of measurement tools and techniques</li>
                      <li>Attention to detail</li>
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Business Development Manager</h3>
                  <div className="flex space-x-4 mb-4">
                    <span className="text-sm bg-violet-100 text-primary px-2 py-1 rounded">Full-time</span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Multiple Locations</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're looking for a Business Development Manager to help expand our client base both domestically and internationally.
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>MBA or equivalent</li>
                      <li>5+ years in business development</li>
                      <li>Experience in manufacturing industry</li>
                      <li>Strong negotiation and communication skills</li>
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Apply Now</h2>
                <p className="text-gray-600">
                  Don't see a position that matches your skills? Submit your resume and we'll keep it on file for future opportunities.
                </p>
              </div>
              
              <Card className="border border-gray-200">
                <CardContent className="p-6">
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
                        <Label htmlFor="position">Position of Interest</Label>
                        <Input 
                          id="position" 
                          name="position" 
                          value={formData.position} 
                          onChange={handleChange} 
                          placeholder="What position are you applying for?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input 
                          id="experience" 
                          name="experience" 
                          value={formData.experience} 
                          onChange={handleChange} 
                          placeholder="How many years of relevant experience do you have?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resume">Upload Resume *</Label>
                        <Input 
                          id="resume" 
                          name="resume" 
                          type="file" 
                          required 
                          onChange={handleFileChange} 
                          accept=".pdf,.doc,.docx"
                        />
                        <p className="text-xs text-gray-500">
                          Upload PDF, DOC, or DOCX (Max size: 5MB)
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="Tell us about your skills, experience, and why you want to join J.V. Enterprises"
                        rows={5}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-violet-700 text-white">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;

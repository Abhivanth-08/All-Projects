
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">Contact Us</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Get in touch with our team</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
              <TabsTrigger value="inquiry">Send Inquiry</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <Phone className="mx-auto mb-2 text-primary" size={32} />
                    <CardTitle className="text-lg">Mobile</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">+91 97906 50162</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Phone className="mx-auto mb-2 text-primary" size={32} />
                    <CardTitle className="text-lg">Office</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">+91 96556 10162</p>
                    <p className="text-gray-600">0422-2536162</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Phone className="mx-auto mb-2 text-primary" size={32} />
                    <CardTitle className="text-lg">Sales & Service</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">+91 96557 70162</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Mail className="mx-auto mb-2 text-primary" size={32} />
                    <CardTitle className="text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">edm@jventerprises.co.in</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="text-center">
                  <MapPin className="mx-auto mb-2 text-primary" size={32} />
                  <CardTitle className="text-lg">Address</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">JV Enterprises</p>
                  <p className="text-gray-600">No-08/149 Ganapathy Puthur 8th Street</p>
                  <p className="text-gray-600">Ganapathy, Coimbatore</p>
                  <p className="text-gray-600">Tamil Nadu, India - 641006</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Clock className="mx-auto mb-2 text-primary" size={32} />
                  <CardTitle className="text-lg">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                  <CardDescription>Visit our facility to see our capabilities firsthand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.75602252393463!2d76.9735824862607!3d11.031396822160929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85fcd2ac865e5%3A0x6e08a00d0d01398d!2sJV%20ENTERPRISES!5e0!3m2!1sen!2sin!4v1751040597795!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiry" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us an Inquiry</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter the subject of your inquiry"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-violet-700">
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

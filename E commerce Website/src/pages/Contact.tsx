
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-industrial-blue text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              We're here to help. Reach out to us with any questions or inquiries.
            </p>
          </div>
        </div>
        
        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-industrial-blue mb-6">Send Us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Enter your name" 
                          required 
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          required 
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <Input 
                          id="subject" 
                          type="text" 
                          placeholder="Enter subject" 
                          required 
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea 
                        id="message" 
                        rows={6} 
                        placeholder="Enter your message" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-industrial-blue focus:border-industrial-blue resize-none"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="bg-industrial-blue hover:bg-blue-700 text-white px-8 py-3">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-industrial-blue mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-industrial-orange flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-1">Our Location</h3>
                        <p className="text-gray-700">
                          123 Industrial Area, Phase II<br />
                          Bangalore, Karnataka 560001<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="text-industrial-orange flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-1">Phone Number</h3>
                        <p className="text-gray-700">+91 98765 43210</p>
                        <p className="text-gray-700">+91 98765 43211</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="text-industrial-orange flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-1">Email Address</h3>
                        <p className="text-gray-700">info@sparepartsbazaar.com</p>
                        <p className="text-gray-700">sales@sparepartsbazaar.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="text-industrial-orange flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
                        <p className="text-gray-700">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-industrial-lightblue rounded-lg p-8">
                  <h3 className="text-xl font-bold text-industrial-blue mb-4">Need Urgent Help?</h3>
                  <p className="text-gray-700 mb-4">
                    For urgent inquiries or technical support, please call our dedicated helpline.
                  </p>
                  <p className="text-xl font-bold text-industrial-blue">
                    +91 80001 23456
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="h-96 bg-gray-200 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-xl font-bold mb-2">Google Maps Integration</h3>
            <p>A Google Map would be embedded here showing the business location</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

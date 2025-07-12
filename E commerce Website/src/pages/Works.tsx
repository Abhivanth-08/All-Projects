import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Works = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Works</h1>
            <p className="text-xl text-violet-100 max-w-3xl">
              Explore our portfolio of precision manufacturing and service projects with prestigious clients including IITs, NITs, and global partners.
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <TabsTrigger value="all">All Works</TabsTrigger>
                  <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                  <TabsTrigger value="service">Service</TabsTrigger>
                  <TabsTrigger value="domestic">Domestic</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
              </div>
              
              {/* All Works */}
              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Project 1 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="IIT Collaboration" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">Manufacturing</span>
                        <span className="text-xs text-gray-500">2023</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Precision Components for IIT Research Lab</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Custom-designed and manufactured specialized components for advanced research equipment at the IIT Delhi Mechanical Engineering Department.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  {/* Project 2 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="BrahMos Collaboration" 
                      className="w-full h-48 object-cover" 
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">Manufacturing</span>
                        <span className="text-xs text-gray-500">2022</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">High-Precision Components for BrahMos Aerospace</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Supplied critical components requiring extremely tight tolerances for specialized aerospace applications.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  {/* Project 3 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="Goldsan Deal" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">International</span>
                        <span className="text-xs text-gray-500">2021</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Goldsan Partnership (China)</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Major ₹3 crore deal with Goldsan (China) for supplying specialized manufacturing equipment and components.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  {/* Project 4 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="NIT Collaboration" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">Service</span>
                        <span className="text-xs text-gray-500">2022</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Equipment Restoration for NIT Trichy</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Complete overhaul and modernization of legacy manufacturing equipment at NIT Trichy, extending operational life by 15 years.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  {/* Project 5 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="Industrial Maintenance" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">Service</span>
                        <span className="text-xs text-gray-500">2023</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Preventive Maintenance Program</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Implemented comprehensive preventive maintenance system for a major manufacturing facility, reducing downtime by 37%.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  {/* Project 6 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="/placeholder.svg" 
                      alt="Custom Machine" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">Manufacturing</span>
                        <span className="text-xs text-gray-500">2022</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Custom CNC Machine Development</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Designed and built a specialized CNC machine for a unique manufacturing process with proprietary specifications.
                      </p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Other tabs would follow a similar structure */}
              <TabsContent value="manufacturing">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">Manufacturing projects will appear here</h3>
                </div>
              </TabsContent>
              
              <TabsContent value="service">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">Service projects will appear here</h3>
                </div>
              </TabsContent>
              
              <TabsContent value="domestic">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">Domestic projects will appear here</h3>
                </div>
              </TabsContent>
              
              <TabsContent value="international">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">International projects will appear here</h3>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Have a project in mind?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We're ready to bring our expertise to your next manufacturing or service challenge.
            </p>
            <Button className="bg-primary hover:bg-violet-700 text-white px-8 py-3 text-lg">
              Contact Us Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Works;

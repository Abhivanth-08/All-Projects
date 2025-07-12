
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Works = () => {
  const clientProjects = [
    {
      name: 'BrahMos Aerospace',
      title: 'High-Precision Components for Aerospace Applications',
      description: 'Supplied critical components requiring extremely tight tolerances for specialized aerospace applications. Our precision manufacturing capabilities enabled BrahMos to meet their stringent quality requirements.',
      year: '2022-2024',
      category: 'Aerospace & Defense'
    },
    {
      name: 'IIT Madras',
      title: 'Precision Components for Research Laboratory',
      description: 'Custom-designed and manufactured specialized components for advanced research equipment at the IIT Madras Mechanical Engineering Department. Enabling cutting-edge research with precision-engineered solutions.',
      year: '2023',
      category: 'Academic & Research'
    },
    {
      name: 'Emerald Jewellers',
      title: 'Specialized Manufacturing Equipment',
      description: 'Provided customized manufacturing solutions and precision components for jewelry manufacturing processes, ensuring quality and efficiency in their production line.',
      year: '2022-2023',
      category: 'Jewelry Manufacturing'
    },
    {
      name: 'Salzer Group',
      title: 'Industrial Components & Service Solutions',
      description: 'Comprehensive supply of industrial spare parts and maintenance services for Salzer Group\'s manufacturing operations, ensuring minimal downtime and optimal performance.',
      year: '2021-2024',
      category: 'Industrial Manufacturing'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">Our Client Projects</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Explore our successful partnerships with industry leaders</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Featured Client Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clientProjects.map((project, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold bg-violet-100 text-primary px-2 py-1 rounded">
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-primary">{project.name}</h3>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <Button variant="outline" className="w-full">View Project Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
        
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

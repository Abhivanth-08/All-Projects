import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientShowcase from '@/components/ClientShowcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Award, Users, TrendingUp, Target, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Commitment to delivering the highest quality products with rigorous testing and inspection processes."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for excellence in every aspect of our business, from manufacturing to customer service."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Putting our customers at the center of everything we do, ensuring their success is our success."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously innovating and improving our products and processes to stay ahead of industry trends."
    }
  ];

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "J.V. Enterprises was established by ShivaKumar V with a vision to provide precision industrial components."
    },
    {
      year: "2012",
      title: "First Major Contract",
      description: "Secured our first major contract with a leading automotive manufacturer, establishing our reputation for quality."
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Expanded our manufacturing capabilities and started serving aerospace and defense industries."
    },
    {
      year: "2018",
      title: "International Recognition",
      description: "Received international quality certifications and began exporting to global markets."
    },
    {
      year: "2020",
      title: "Technology Upgrade",
      description: "Invested in state-of-the-art EDM and CNC machinery to enhance precision and efficiency."
    },
    {
      year: "2024",
      title: "Digital Transformation",
      description: "Launched our digital platform to better serve customers and streamline operations."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-industrial-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">About J.V. Enterprises</h1>
            <p className="mt-2 text-blue-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Precision engineering since 2009</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Our History</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    J.V. Enterprises was founded in 2009 by ShivaKumar V with a clear vision: to become India's leading provider of precision industrial components. What started as a small workshop has grown into a well-established company specializing in both manufacturing and servicing of various machines and spare parts.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our commitment to precision and quality has earned us partnerships with some of the most prestigious institutions in the country, including IITs, NITs, and BrahMos Aerospace. We take pride in providing high-quality engineering solutions that power India's manufacturing sector.
                  </p>
                  <p className="text-gray-600">
                    Today, we continue to expand our capabilities and reach, always maintaining our core values of quality, innovation, and customer satisfaction.
                  </p>
                </div>
                <div>
                  <img 
                    src="/about-company.jpg" 
                    alt="J.V. Enterprises facility" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-primary" size={24} />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To elevate manufacturing excellence through high-quality industrial spare parts, precision engineering, and innovative solutions that empower our clients to achieve their production goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-primary" size={24} />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To be recognized as the premier provider of precision industrial components across India and beyond, setting new standards for quality, reliability, and customer service in the manufacturing industry.
                  </p>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.75602252393463!2d76.9735824862607!3d11.031396822160929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85fcd2ac865e5%3A0x6e08a00d0d01398d!2sJV%20ENTERPRISES!5e0!3m2!1sen!2sin!4v1751040597795!5m2!1sen!2sin!4v1751040597795!5m2!1sen!2sin" 
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

              {/* Add client showcase in the overview section */}
              <div className="mt-12">
                <ClientShowcase />
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-8">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Our Journey Through the Years</h2>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                            {milestone.year}
                          </span>
                          {milestone.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="values" className="mt-8">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center">What Drives Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <Card key={index}>
                      <CardHeader className="text-center">
                        <value.icon className="mx-auto mb-2 text-primary" size={48} />
                        <CardTitle>{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-gray-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leadership" className="mt-8">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Our Leadership</h2>
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users size={48} className="text-gray-400" />
                    </div>
                    <CardTitle>ShivaKumar V</CardTitle>
                    <CardDescription>Founder & Managing Director</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      With over 15 years of experience in precision engineering and manufacturing, ShivaKumar V founded J.V. Enterprises with a vision to deliver exceptional quality industrial components. His leadership and technical expertise have been instrumental in establishing the company's reputation for excellence in the industry.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

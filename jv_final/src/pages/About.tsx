
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Target, Globe, Zap, Shield } from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'history', label: 'Our History', icon: Award },
    { id: 'values', label: 'Our Values', icon: Target },
    { id: 'leadership', label: 'Leadership', icon: Users }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision Excellence',
      description: 'We deliver unmatched precision in every component we manufacture, ensuring the highest quality standards.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Our commitment to reliability means our clients can depend on us for consistent, high-quality results.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously invest in cutting-edge technology and innovative manufacturing processes.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term partnerships with our clients, understanding their unique needs and challenges.'
    }
  ];

  const leaders = [
    {
      name: 'Vivek MB',
      position: 'Sales',
      experience: 'Ph: 9655770162',
      description: ''
    },
    {
      name: 'Rajkumar MB',
      position: 'Service',
      experience: 'Ph: 9655660162',
      description: ''
    },
    {
      name: 'Rathiga MB',
      position: 'Admin',
      experience: 'Ph: 9655610162',
      description: ''
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / button.offsetWidth) * 100;
    button.style.setProperty('--x', `${x}%`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-violet-dark mb-6">About Precision Components</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Established as a leader in precision manufacturing, Precision Components has been at the forefront 
                  of delivering high-quality industrial solutions for over two decades. Our commitment to excellence 
                  and innovation has made us a trusted partner for clients across aerospace, defense, research, and 
                  manufacturing industries.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With state-of-the-art facilities and a team of skilled professionals, we specialize in manufacturing 
                  precision components that meet the most stringent quality requirements. Our expertise spans from 
                  complex aerospace components to specialized research equipment parts.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <h3 className="text-xl font-bold text-violet-dark">Quality Assured</h3>
                    <p className="text-sm text-gray-600">Precision and excellence in every product</p>
                  </div>
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <h3 className="text-xl font-bold text-violet-dark">Global Reach</h3>
                    <p className="text-sm text-gray-600">Serving clients in India and abroad, including China</p>
                  </div>
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <h3 className="text-xl font-bold text-violet-dark">Trusted Partners</h3>
                    <p className="text-sm text-gray-600">Collaborating with industry leaders worldwide</p>
                  </div>
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <h3 className="text-xl font-bold text-violet-dark">Established History</h3>
                    <p className="text-sm text-gray-600">Over a decade of proven expertise</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/assets/images/company.jpg" 
                  alt="Company Building" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-violet-dark mb-6">Our Journey</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 animate-slide-in-left">
                <Badge className="bg-violet-dark text-white">2009</Badge>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Starting consumables</h3>
                  <p className="text-gray-600">Launched our consumables business, providing essential parts to the industry.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-slide-in-right">
                <Badge className="bg-violet-dark text-white">2015</Badge>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Starting machine sales</h3>
                  <p className="text-gray-600">Began offering a wide range of industrial machines for sale across India.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-slide-in-left">
                <Badge className="bg-violet-dark text-white">2020</Badge>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Starting assembling</h3>
                  <p className="text-gray-600">Expanded into assembling, delivering integrated solutions to our clients.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'values':
        return (
          <div className="space-y-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-violet-dark mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <value.icon size={32} className="text-violet-dark mr-4" />
                      <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'leadership':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-violet-dark mb-6">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in-stagger">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={32} className="text-violet-dark" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{leader.name}</h3>
                    <p className="text-violet-dark font-medium mb-2">{leader.position}</p>
                    <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
                    <p className="text-sm text-gray-700">{leader.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-violet-dark text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">About Us</h1>
            <p className="mt-2 text-violet-100 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">Leading precision manufacturing with excellence and innovation</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'outline'}
                onClick={() => setActiveSection(item.id)}
                onMouseMove={handleMouseMove}
                className={`wave-link flex items-center space-x-2 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                  activeSection === item.id 
                    ? 'bg-violet-dark hover:bg-violet text-white transform scale-105' 
                    : 'hover:bg-violet-50 hover:text-violet-dark border-violet-300'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

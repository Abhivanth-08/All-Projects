
import React from 'react';

const clients = [
  {
    name: 'BrahMos Aerospace',
    website: 'https://www.brahmos.com/',
  },
  {
    name: 'Emerald Jewellers',
    website: 'https://www.ejindia.com/',
  },
  {
    name: 'Salzer Group',
    website: 'https://www.salzergroup.net/',
  },
  {
    name: 'IIT Madras',
    website: 'https://www.iitm.ac.in/',
  }
];

const ClientShowcase = () => {
  const handleClientClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-16">
          <span className="inline-block border-b-4 border-violet pb-2">Trusted by Industry Leaders</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="w-full max-w-[200px] h-20 bg-gray-50 rounded-lg flex items-center justify-center p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 border-2 border-gray-100"
              onClick={() => handleClientClick(client.website)}
            >
              <div className="text-lg font-bold text-gray-700 text-center group-hover:text-violet transition-colors">
                {client.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;

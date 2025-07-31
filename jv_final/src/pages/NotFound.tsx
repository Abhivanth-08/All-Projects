
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <h1 className="text-9xl font-bold text-industrial-blue mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-industrial-blue hover:bg-blue-700 text-white" asChild>
              <Link to="/">
                Back to Homepage
              </Link>
            </Button>
            <Button variant="outline" className="border-industrial-blue text-industrial-blue hover:bg-industrial-lightblue" asChild>
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

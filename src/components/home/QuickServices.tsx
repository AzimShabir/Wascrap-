
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Recycle, PiggyBank } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/booking');
  };

  const services = [
    {
      title: "Doorstep Pickup",
      description: "Schedule a pickup from the comfort of your home. Our team will collect the scrap from your doorstep.",
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
    },
    {
      title: "All Scrap Accepted",
      description: "We accept all types of recyclable scrap materials, including paper, plastic, metal, and electronics.",
      icon: <Package className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      title: "Eco-Friendly Recycling",
      description: "Ensure your scrap is recycled responsibly, reducing environmental impact and promoting sustainability.",
      icon: <Recycle className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />,
    },
    {
      title: "Instant Cash Payment",
      description: "Get paid instantly for your scrap. We offer competitive rates and transparent transactions.",
      icon: <PiggyBank className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Services</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our services for hassle-free scrap collection and recycling. We offer convenient solutions for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-green-200 cursor-pointer"
              onClick={handleServiceClick}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 flex items-center space-x-3">
                  {service.icon}
                  <span>{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={handleServiceClick}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book a Pickup Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;

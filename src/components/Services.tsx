import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/booking');
  };

  const services = [
    {
      title: "Scrap Pickup",
      description: "Schedule a pickup for all types of recyclable materials from your doorstep.",
      icon: <Truck className="w-8 h-8 text-green-600" />,
      details: [
        "Doorstep pickup",
        "All types of scrap",
        "Eco-friendly disposal"
      ]
    },
    {
      title: "E-waste Recycling",
      description: "Safely dispose of electronic waste and contribute to a cleaner environment.",
      icon: <Recycle className="w-8 h-8 text-blue-600" />,
      details: [
        "Certified recycling",
        "Data security",
        "Environmental compliance"
      ]
    },
    {
      title: "Industrial Scrap Solutions",
      description: "Comprehensive waste management solutions for industries and businesses.",
      icon: <Recycle className="w-8 h-8 text-purple-600" />,
      details: [
        "Customized plans",
        "Cost-effective",
        "Sustainable practices"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of scrap management and recycling services to meet your needs.
            From doorstep pickup to industrial solutions, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-gray-100 hover:border-green-200 cursor-pointer"
              onClick={handleServiceClick}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    {service.icon}
                    <span>{service.title}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </CardDescription>
                <div className="mt-4 space-y-2">
                  {service.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      • {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Book a pickup today and join us in making a positive impact on the environment.
          </p>
          <button
            onClick={handleServiceClick}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full"
          >
            Book a Pickup Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;

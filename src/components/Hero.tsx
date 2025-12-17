
import { MapPin, Clock, Recycle, ArrowRight, Users, Handshake, Leaf, Award, Globe } from 'lucide-react';
import TouchOptimizedButton from './TouchOptimizedButton';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBenefitClick = () => {
    navigate('/booking');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden pt-24 md:pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 right-32 w-16 h-16 bg-green-500 rounded-full opacity-25 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8 md:mb-12">
            <div className="relative">
              <Recycle className="w-16 h-16 md:w-20 md:h-20 text-green-600 animate-spin-slow" />
              <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-full opacity-10 animate-ping"></div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-gray-800 tracking-tight">
              WAS<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400">CRAP</span>
            </h1>
          </div>
          
          {/* Main Tagline */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
              Let's Go Green – <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Sustainably!</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-medium px-4">
              India's first digital platform connecting scrap sellers directly with recyclers. 
              <br className="hidden md:block" />
              <span className="text-green-600 font-semibold">No middlemen, fair pricing, and sustainable waste management at your fingertips.</span>
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl mx-auto px-4">
            <div 
              onClick={handleBenefitClick}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100 cursor-pointer group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Digital Scheduling</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Book pickups through our smart app with real-time tracking</p>
            </div>
            
            <div 
              onClick={handleBenefitClick}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100 cursor-pointer group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Fair Pricing</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Transparent rates with no hidden costs or middleman markup</p>
            </div>

            <div 
              onClick={handleBenefitClick}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100 cursor-pointer group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Eco-Friendly</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Sustainable practices with certified recycling partners</p>
            </div>

            <div 
              onClick={handleBenefitClick}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100 cursor-pointer group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Full Support</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">End-to-end logistics with 24/7 customer assistance</p>
            </div>
          </div>

          {/* CTA Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <TouchOptimizedButton 
              onClick={() => navigate('/booking')}
              className="w-full sm:w-auto text-lg md:text-xl shadow-2xl"
              variant="primary"
            >
              Schedule Pickup Now
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
            </TouchOptimizedButton>
            
            <TouchOptimizedButton 
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto text-lg md:text-xl shadow-xl"
              variant="secondary"
            >
              Partner With Us
              <Handshake className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
            </TouchOptimizedButton>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">500+</div>
              <p className="text-sm md:text-base text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">50T+</div>
              <p className="text-sm md:text-base text-gray-600 font-medium">Waste Recycled</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">24/7</div>
              <p className="text-sm md:text-base text-gray-600 font-medium">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

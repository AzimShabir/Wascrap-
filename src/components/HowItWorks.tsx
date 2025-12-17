
import { Smartphone, Truck, DollarSign, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "List Your Scrap",
      description: "Seller lists scrap materials on our user-friendly app with photos and details",
      color: "from-green-500 to-green-400",
      step: "01"
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Verified Pickup",
      description: "Our verified and trained drivers arrive at your location for safe collection",
      color: "from-blue-500 to-blue-400",
      step: "02"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Direct Payment",
      description: "Buyers pay directly to sellers - no middlemen, transparent pricing guaranteed",
      color: "from-purple-500 to-purple-400",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 3-step process makes scrap collection efficient, transparent, and profitable for everyone
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="relative mb-6">
                    <div className={`bg-gradient-to-r ${step.color} p-4 rounded-2xl w-fit mx-auto shadow-lg`}>
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-3xl p-8 max-w-4xl mx-auto text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Why Choose WASCRAP?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-green-100">Transparent Pricing</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-green-100">Hidden Charges</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-green-100">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

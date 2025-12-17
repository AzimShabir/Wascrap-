
import { DollarSign, Recycle, Truck, Crown, TrendingUp, Users, Target } from 'lucide-react';

const BusinessModel = () => {
  const revenueStreams = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Transaction Commissions",
      description: "Small percentage from each successful scrap transaction on our platform",
      color: "from-green-500 to-green-400",
      percentage: "2-5%"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Bulk Sales to Recyclers",
      description: "Direct sales of aggregated scrap materials to large recycling facilities",
      color: "from-blue-500 to-blue-400",
      percentage: "15-20%"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Premium Express Packages",
      description: "Same-day pickup services and priority scheduling for premium customers",
      color: "from-purple-500 to-purple-400",
      percentage: "₹199+"
    }
  ];

  return (
    <section id="business-model" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Model</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sustainable revenue streams that align our success with environmental impact and customer value
          </p>
        </div>

        {/* Revenue Streams */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Revenue Sources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
                <div className={`bg-gradient-to-r ${stream.color} p-4 rounded-2xl w-fit mb-6 shadow-lg`}>
                  <div className="text-white">{stream.icon}</div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-800 mb-4">{stream.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{stream.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">{stream.percentage}</div>
                  <div className="text-sm text-gray-600">Revenue Share</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Model Infographic */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">How We Create Value</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Sellers</h4>
                  <p className="text-sm text-gray-600">Individuals & businesses with scrap materials</p>
                </div>
                <div className="text-green-600 font-semibold">Fair Pricing + Convenience</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
                  <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Logistics</h4>
                  <p className="text-sm text-gray-600">Verified drivers and pickup services</p>
                </div>
                <div className="text-blue-600 font-semibold">Efficient Collection</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
                  <Recycle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Recyclers</h4>
                  <p className="text-sm text-gray-600">Processing facilities and manufacturers</p>
                </div>
                <div className="text-purple-600 font-semibold">Quality Materials</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
                  <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">WASCRAP</h4>
                  <p className="text-sm text-gray-600">Platform connecting all stakeholders</p>
                </div>
                <div className="text-orange-600 font-semibold">Value Creation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Strategy */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-center mb-8">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h3 className="text-3xl font-bold mb-4">Growth Strategy</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Strategic expansion plan to scale impact and revenue sustainably
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Market Penetration</h4>
              <p className="text-gray-300">Establish strong presence in Kashmir region</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Geographic Expansion</h4>
              <p className="text-gray-300">Scale across major Indian cities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Global Vision</h4>
              <p className="text-gray-300">International market opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;

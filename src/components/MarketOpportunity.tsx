
import { TrendingUp, Smartphone, Globe, Leaf, BarChart3, Users, MapPin, Target } from 'lucide-react';

const MarketOpportunity = () => {
  const marketStats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growing Waste Crisis",
      stat: "62M Tonnes",
      description: "Annual waste generation in India, growing at 5% yearly",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Penetration",
      stat: "800M+",
      description: "Smartphone users in India, enabling digital adoption",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Policy Support",
      stat: "100%",
      description: "Government push for sustainable waste management",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Market Gap",
      stat: "₹50B+",
      description: "Unorganized waste collection market opportunity",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const expansionPlan = [
    {
      phase: "Phase 1",
      location: "Srinagar, Kashmir",
      timeline: "2024 Q1-Q2",
      focus: "Local Market Penetration",
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      phase: "Phase 2",
      location: "Jammu & Kashmir",
      timeline: "2024 Q3-Q4",
      focus: "Regional Expansion",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      phase: "Phase 3",
      location: "North India",
      timeline: "2025",
      focus: "Multi-state Operations",
      color: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      phase: "Phase 4",
      location: "Pan India",
      timeline: "2026-2027",
      focus: "National Platform",
      color: "bg-orange-100 text-orange-800 border-orange-200"
    },
    {
      phase: "Phase 5",
      location: "Global Markets",
      timeline: "2028+",
      focus: "International Expansion",
      color: "bg-pink-100 text-pink-800 border-pink-200"
    }
  ];

  return (
    <section id="market-opportunity" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Opportunity</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's massive waste management challenge presents unprecedented opportunities for digital innovation
          </p>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {marketStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
              <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl w-fit mb-6 shadow-lg`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.stat}</h3>
                <h4 className="text-xl font-semibold text-gray-700 mb-3">{stat.title}</h4>
                <p className="text-gray-600 leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Problems & Solutions */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 border border-red-200 mb-8">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Current Market Problems</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Unorganized collection systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Multiple middlemen reducing profits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Lack of transparent pricing</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Inefficient logistics and scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Limited digital integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Environmental impact concerns</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">WASCRAP Solutions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Direct seller-to-buyer platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Transparent, real-time pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Digital scheduling and tracking</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Verified logistics network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Mobile-first user experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Sustainable waste processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expansion Roadmap */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Expansion Roadmap</h3>
          
          <div className="space-y-6">
            {expansionPlan.map((phase, index) => (
              <div key={index} className={`border-2 rounded-2xl p-6 ${phase.color} hover:shadow-lg transition-all duration-300`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      {index < 2 ? <MapPin className="w-6 h-6 text-gray-700" /> : <Globe className="w-6 h-6 text-gray-700" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{phase.phase}</h4>
                      <p className="text-lg font-semibold">{phase.location}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold mb-1">{phase.timeline}</div>
                    <div className="text-sm">{phase.focus}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Size */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-center mb-8">
            <Target className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h3 className="text-3xl font-bold mb-4">Total Addressable Market</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              India's waste management sector represents a massive opportunity for digital transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-green-400">₹50B+</div>
              <div className="text-gray-300">Current Market Size</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">₹120B+</div>
              <div className="text-gray-300">Projected by 2030</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-purple-400">15%</div>
              <div className="text-gray-300">Annual Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunity;

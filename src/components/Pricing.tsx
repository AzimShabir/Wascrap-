
import { DollarSign, Truck, Plus, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
  const pricingData = [
    {
      title: "Paper Scrap",
      price: "₹10",
      unit: "/kg",
      condition: "Only on orders above 1000 kg",
      icon: "📄",
      color: "from-blue-500 to-blue-400",
      bgColor: "bg-blue-50"
    },
    {
      title: "Cardboard Scrap",
      price: "₹9",
      unit: "/kg",
      condition: "All quantities accepted",
      icon: "📦",
      color: "from-orange-500 to-orange-400",
      bgColor: "bg-orange-50"
    },
    {
      title: "Mixed Paper Scrap",
      price: "₹9.5",
      unit: "/kg",
      condition: "Sorted mixed paper materials",
      icon: "📑",
      color: "from-purple-500 to-purple-400",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fair, competitive rates with no hidden charges. Know exactly what you'll earn before you sell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricingData.map((item, index) => (
            <Card key={index} className={`${item.bgColor} border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl`}>
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{item.icon}</div>
                <CardTitle className="text-2xl font-bold text-gray-800">{item.title}</CardTitle>
                <CardDescription className="text-gray-600">{item.condition}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-800">{item.price}</span>
                  <span className="text-xl text-gray-600">{item.unit}</span>
                </div>
                <div className={`bg-gradient-to-r ${item.color} text-white py-3 px-6 rounded-full font-semibold shadow-lg`}>
                  Current Market Rate
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-3xl font-bold text-gray-800">
                Self-Transport Incentive
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-4xl font-bold text-green-600">₹1.05</span>
                  <span className="text-xl text-gray-600">/kg extra</span>
                </div>
                <p className="text-gray-600 text-lg">
                  When you use <strong>self-transport</strong> to deliver scrap to our collection centers, 
                  WASCRAP adds an extra ₹1.05 per kg as a transport incentive to your total payment.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Example Calculation</h4>
                  <p className="text-sm text-gray-600">
                    100kg Paper: ₹1000 + ₹105 (transport) = ₹1105 total
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Info className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                  <p className="text-sm text-gray-600">
                    Save time, earn more, support sustainable transport
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 max-w-3xl mx-auto text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Pricing Promise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2 text-green-400">✓</div>
                <div className="text-gray-300">No Hidden Charges</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-green-400">✓</div>
                <div className="text-gray-300">Real-time Rates</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-green-400">✓</div>
                <div className="text-gray-300">Instant Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

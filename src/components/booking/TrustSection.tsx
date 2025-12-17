
import { CheckCircle, Clock, Phone } from 'lucide-react';

const TrustSection = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-800 mb-2">Secure & Safe</h4>
        <p className="text-gray-600">All transactions are secure and verified</p>
      </div>
      <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
        <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-800 mb-2">Quick Response</h4>
        <p className="text-gray-600">We respond within 10 minutes</p>
      </div>
      <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
        <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
        <p className="text-gray-600">Always here to help you</p>
      </div>
    </div>
  );
};

export default TrustSection;


import { Shield, Clock, Award, Users } from 'lucide-react';

const TrustIndicators = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">100%</div>
            <p className="text-sm md:text-base text-gray-600 font-medium">Secure & Safe</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">10min</div>
            <p className="text-sm md:text-base text-gray-600 font-medium">Quick Response</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Award className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">Best</div>
            <p className="text-sm md:text-base text-gray-600 font-medium">Fair Pricing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">500+</div>
            <p className="text-sm md:text-base text-gray-600 font-medium">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;

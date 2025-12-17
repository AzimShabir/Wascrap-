
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Terms of <span className="text-green-600">Service</span>
            </h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using our services.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 md:p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using WASCRAP's services, you accept and agree to be bound by the 
                    terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Description</h2>
                <div className="space-y-4 text-gray-700">
                  <p>WASCRAP provides:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Doorstep scrap collection services</li>
                    <li>Connection between scrap sellers and verified buyers</li>
                    <li>Digital platform for waste management</li>
                    <li>Recycling and disposal services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
                <div className="space-y-4 text-gray-700">
                  <p>As a user, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>Ensure scrap materials are clean and properly sorted</li>
                    <li>Be available at the scheduled pickup time</li>
                    <li>Follow safety guidelines for hazardous materials</li>
                    <li>Respect our staff and partners</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing and Payment</h2>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Prices are subject to market conditions and material quality</li>
                    <li>Final pricing is determined after material evaluation</li>
                    <li>Payments are processed within 24-48 hours of pickup</li>
                    <li>We reserve the right to refuse materials that don't meet our standards</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancellation Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Users can cancel bookings up to 2 hours before scheduled pickup</li>
                    <li>Repeated cancellations may result in service restrictions</li>
                    <li>We may cancel orders due to safety concerns or fraudulent activity</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    WASCRAP shall not be liable for any indirect, incidental, special, consequential, 
                    or punitive damages, including without limitation, loss of profits, data, use, 
                    goodwill, or other intangible losses.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Items</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We do not accept:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hazardous chemicals and toxic substances</li>
                    <li>Radioactive materials</li>
                    <li>Medical waste</li>
                    <li>Explosive or flammable materials</li>
                    <li>Any items prohibited by local laws</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also 
                    governs your use of the service, to understand our practices.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modifications</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    WASCRAP reserves the right to modify these terms at any time. Users will be 
                    notified of significant changes via email or through the platform.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    For questions about these Terms of Service, please contact:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> wascrap99@gmail.com</p>
                    <p><strong>Phone:</strong> +91 8899619076 / +91 9149788578</p>
                  </div>
                </div>
              </section>

              <section>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm text-gray-600">
                    <strong>Last updated:</strong> January 2024
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;

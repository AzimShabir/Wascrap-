
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Privacy <span className="text-green-600">Policy</span>
            </h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect and use your information.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 md:p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal details (name, email, phone number)</li>
                    <li>Address and location information for pickup services</li>
                    <li>Scrap details and weight information</li>
                    <li>Payment and billing information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and maintain our scrap collection services</li>
                    <li>Process your pickup requests and manage bookings</li>
                    <li>Send you confirmations, updates, and service notifications</li>
                    <li>Improve our services and customer experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We may share your information with:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Authorized scrap buyers and collection partners</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                  <p>We do not sell or rent your personal information to third parties.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet is 100% secure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File a complaint with relevant authorities</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> wascrap99@gmail.com</p>
                    <p><strong>Phone:</strong> +91 8899619076 / +91 9149788578</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new Privacy Policy on this page and updating the effective date.
                  </p>
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

export default PrivacyPolicy;

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Handshake, TrendingUp, Users, Recycle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PartnerWithUs = () => {
  const [selectedPartnerType, setSelectedPartnerType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    partnerType: '',
    message: ''
  });

  const partnerTypes = [
    {
      type: "investors",
      title: "Investors",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Join us in scaling India's waste management revolution",
      benefits: ["High growth potential", "Environmental impact", "Market leadership opportunity"],
      color: "from-green-500 to-green-400",
      bgColor: "bg-green-50"
    },
    {
      type: "transporters",
      title: "Transporters",
      icon: <Users className="w-8 h-8" />,
      description: "Become part of our verified logistics network",
      benefits: ["Steady income stream", "Flexible scheduling", "Technology support"],
      color: "from-blue-500 to-blue-400",
      bgColor: "bg-blue-50"
    },
    {
      type: "recyclers",
      title: "Recyclers",
      icon: <Recycle className="w-8 h-8" />,
      description: "Access quality materials through our platform",
      benefits: ["Consistent supply", "Quality assurance", "Direct procurement"],
      color: "from-purple-500 to-purple-400",
      bgColor: "bg-purple-50"
    },
    {
      type: "ngo",
      title: "NGO Partners",
      icon: <Handshake className="w-8 h-8" />,
      description: "Collaborate for environmental and social impact",
      benefits: ["Community engagement", "Awareness programs", "Sustainability goals"],
      color: "from-orange-500 to-orange-400",
      bgColor: "bg-orange-50"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-partner-inquiry', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Success!",
          description: "Your partnership inquiry has been submitted successfully. We'll get back to you soon!",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          partnerType: '',
          message: ''
        });
        setSelectedPartnerType('');
      } else {
        throw new Error(data?.error || 'Failed to submit inquiry');
      }
    } catch (error: any) {
      console.error('Error submitting partner inquiry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partner" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">With Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join WASCRAP's mission to revolutionize waste management. Together, we can create a sustainable future 
            while building profitable partnerships.
          </p>
        </div>

        {/* Partnership Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {partnerTypes.map((partner, index) => (
            <Card 
              key={index} 
              className={`${partner.bgColor} border-2 hover:border-green-200 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl cursor-pointer ${selectedPartnerType === partner.type ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => {
                setSelectedPartnerType(partner.type);
                setFormData({...formData, partnerType: partner.type});
              }}
            >
              <CardHeader className="text-center">
                <div className={`bg-gradient-to-r ${partner.color} p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg`}>
                  <div className="text-white">{partner.icon}</div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">{partner.title}</CardTitle>
                <CardDescription className="text-gray-600">{partner.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {partner.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="text-3xl font-bold text-gray-800 text-center">Let's Work Together</CardTitle>
              <CardDescription className="text-center text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-lg font-semibold text-gray-700">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      placeholder="Company name (optional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerType" className="text-lg font-semibold text-gray-700">Partnership Interest *</Label>
                  <select
                    id="partnerType"
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl px-3 text-gray-700"
                  >
                    <option value="">Select partnership type</option>
                    <option value="investors">Investor</option>
                    <option value="transporters">Transporter/Logistics</option>
                    <option value="recyclers">Recycler/Buyer</option>
                    <option value="ngo">NGO/Community Partner</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-semibold text-gray-700">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border-2 border-gray-200 focus:border-green-500 rounded-xl px-3 py-2 text-gray-700"
                    placeholder="Tell us about your interest and how you'd like to partner with WASCRAP..."
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white px-12 py-4 text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Onboard Now'}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 max-w-4xl mx-auto text-white shadow-xl">
            <Handshake className="w-16 h-16 mx-auto mb-6 text-green-400" />
            <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of partners already working with WASCRAP to create a cleaner, more sustainable future for India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2 text-green-400">500+</div>
                <div className="text-gray-300">Active Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-blue-400">₹10Cr+</div>
                <div className="text-gray-300">Partner Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-purple-400">24/7</div>
                <div className="text-gray-300">Partner Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;


import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    // Send WhatsApp notifications
    const message = `📧 New Contact Form Inquiry from WASCRAP Website
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}
Message: ${formData.message}

Please respond to this inquiry promptly.`;

    // Open WhatsApp for both numbers
    const whatsappAzim = `https://wa.me/918899619076?text=${encodeURIComponent(message)}`;
    const whatsappYawar = `https://wa.me/919149788578?text=${encodeURIComponent(message)}`;
    
    // Open both WhatsApp chats
    window.open(whatsappAzim, '_blank');
    setTimeout(() => {
      window.open(whatsappYawar, '_blank');
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Azim (Founder)",
      details: ["+91 8899619076", "Available: 9 AM - 8 PM"],
      color: "from-green-500 to-green-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Yawar (Co-founder)",
      details: ["+91 9149788578", "Available: 9 AM - 8 PM"],
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@wascrap.com", "Response within 24 hours"],
      color: "from-purple-500 to-purple-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: ["IGC Lassipora", "Jammu & Kashmir, India"],
      color: "from-orange-500 to-orange-400"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about WASCRAP? Want to get started? Our team is here to help you 
            make the most of our platform.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h3>
              
              {contactInfo.map((contact, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${contact.color} p-3 rounded-xl shadow-lg`}>
                        <div className="text-white">{contact.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{contact.title}</h4>
                        {contact.details.map((detail, idx) => (
                          <p key={idx} className={`${idx === 0 ? 'text-gray-800 font-semibold' : '  text-gray-600 text-sm'}`}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Quick Links */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                    <MessageCircle className="w-6 h-6 text-green-600 mr-2" />
                    Quick Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-green-300 text-green-700 hover:bg-green-100"
                      onClick={() => window.open('https://wa.me/918899619076', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Azim
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-blue-300 text-blue-700 hover:bg-blue-100"
                      onClick={() => window.open('https://wa.me/919149788578', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Yawar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-2 border-gray-100">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="text-3xl font-bold text-gray-800">Send Us a Message</CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    We'll get back to you as soon as possible
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
                        <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-lg font-semibold text-gray-700">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-lg font-semibold text-gray-700">Message *</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full border-2 border-gray-200 focus:border-green-500 rounded-xl px-3 py-2 text-gray-700 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-green-500 text-white px-12 py-4 text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full"
                      >
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="shadow-xl border-2 border-gray-100">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">Find Us</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Visit our office at IGC Lassipora, Jammu & Kashmir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.4891234567!2d74.8375!3d34.1146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1949e5c9b5c5b%3A0x1234567890abcdef!2sWASCRAP!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WASCRAP Office Location"
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-800">WASCRAP Office</h4>
                </div>
                <p className="text-lg text-gray-700 mb-2">IGC Lassipora, Jammu & Kashmir, India</p>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're building the future of waste management from the beautiful valleys of Kashmir. 
                  Come visit us to see our operations and discuss partnership opportunities.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-green-300 text-green-700 hover:bg-green-100"
                  onClick={() => window.open('https://maps.app.goo.gl/QTsQ7usQNXVfxYFf6', '_blank')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

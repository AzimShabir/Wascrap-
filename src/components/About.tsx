
import { Users, MapPin, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: "Azim Shabir",
      role: "Founder",
      education: "Electronics Engineering",
      description: "Visionary leader driving digital transformation in waste management",
      image: "/lovable-uploads/7c7da016-ca75-42b9-bb4f-08edd69f79db.png",
      color: "from-green-500 to-green-400"
    },
    {
      name: "Yawar Hamid",
      role: "Co-founder",
      education: "Electrical Engineering", 
      description: "Strategic mind behind growth and market expansion initiatives",
      image: "/lovable-uploads/21766c25-1ed1-464c-a92a-6a5366810fe8.png",
      color: "from-blue-500 to-blue-400"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">WASCRAP</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from a vision to digitally transform India's waste management ecosystem, 
            creating sustainable solutions for a cleaner tomorrow.
          </p>
        </div>

        {/* Company Vision */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 text-lg">Clean Environment Through Digital Innovation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-lg">Empowering Communities with Technology</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 text-lg">Sustainable Waste Management Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-lg">Transparent & Fair Trading Platform</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-green-600 mr-3" />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800">Headquarters</h4>
                      <p className="text-gray-600">IGC Lassipora</p>
                      <p className="text-gray-600">Jammu & Kashmir, India</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      Building tomorrow's waste management infrastructure from the heart of Kashmir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Founders</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Driven by passion for environmental sustainability and technological innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${member.color} p-2 rounded-full shadow-lg`}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-green-600">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="text-sm text-gray-600 mb-2">Education</div>
                    <div className="font-semibold text-gray-800">{member.education}</div>
                  </div>
                  <p className="text-gray-600 italic">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Our Impact</h3>
            <p className="text-gray-300">Making a difference in waste management across communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-green-600 p-4 rounded-2xl mb-4 mx-auto w-fit">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">2024</div>
              <div className="text-gray-300">Year Founded</div>
            </div>
            <div>
              <div className="bg-blue-600 p-4 rounded-2xl mb-4 mx-auto w-fit">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">Growing</div>
              <div className="text-gray-300">User Base</div>
            </div>
            <div>
              <div className="bg-green-600 p-4 rounded-2xl mb-4 mx-auto w-fit">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">Kashmir</div>
              <div className="text-gray-300">Starting Region</div>
            </div>
            <div>
              <div className="bg-blue-600 p-4 rounded-2xl mb-4 mx-auto w-fit">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">Innovation</div>
              <div className="text-gray-300">Driven Solution</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

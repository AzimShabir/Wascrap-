
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Recycle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="relative">
                    <Recycle className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    <Leaf className="w-3 md:w-4 h-3 md:h-4 text-green-200 absolute -top-1 -right-1" />
                  </div>
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold">
                WAS<span className="text-green-400">CRAP</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              India's first digital platform connecting scrap sellers directly with recyclers. 
              Making waste management sustainable and profitable for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 md:w-5 h-4 md:h-5" />
              </a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter className="w-4 md:w-5 h-4 md:h-5" />
              </a>
              <a href="https://instagram.com/wascrap" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors">
                <Instagram className="w-4 md:w-5 h-4 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-green-400">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-green-400 transition-colors">How It Works</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-green-400 transition-colors">Book Pickup</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-green-400">Our Services</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">Doorstep Pickup</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">E-waste Recycling</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">Industrial Solutions</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">Bulk Collection</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Corporate Partnerships</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-green-400">Contact Us</h3>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Azim: +91 8899619076</p>
                  <p className="text-gray-300">Yawar: +91 9149788578</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300 break-all">wascrap99@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 md:w-5 h-4 md:h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300">Serving across India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left text-xs md:text-sm">
              © 2024 WASCRAP. All rights reserved. | Making India Cleaner, One Pickup at a Time.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-xs md:text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

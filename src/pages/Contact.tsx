
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import PartnerWithUs from '@/components/PartnerWithUs';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Contact />
        <PartnerWithUs />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;


import { User, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
  formData: {
    name: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoStep = ({ formData, handleChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-gray-600">Let us know who you are</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Full Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <Phone className="w-5 h-5 mr-2 text-green-600" />
            Phone Number *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXXXXXXX"
            className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
            required
          />
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h4 className="font-bold text-green-800 mb-2 flex items-center">
          📱 Stay Connected
        </h4>
        <p className="text-green-700">
          We'll send you updates via SMS and email about your pickup status, estimated arrival time, and payment details.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;

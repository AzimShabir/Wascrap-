
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, LogIn } from 'lucide-react';
import ProgressIndicator from './booking/ProgressIndicator';
import PersonalInfoStep from './booking/PersonalInfoStep';
import ScrapDetailsStep from './booking/ScrapDetailsStep';
import ScheduleStep from './booking/ScheduleStep';
import TrustSection from './booking/TrustSection';
import AddressInput from './booking/AddressInput';

interface FormData {
  name: string;
  phone: string;
  email: string;
  houseNumber: string;
  village: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
  scrapType: string;
  estimatedWeight: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
}

const BookingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: user?.email || '',
    houseNumber: '',
    village: '',
    city: '',
    district: '',
    pincode: '',
    state: '',
    scrapType: '',
    estimatedWeight: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.phone.trim();
      case 2:
        return formData.houseNumber.trim() && formData.village.trim() && 
               formData.city.trim() && formData.district.trim() && 
               formData.pincode.trim() && formData.state.trim();
      case 3:
        return formData.scrapType.trim() && formData.estimatedWeight.trim();
      case 4:
        return formData.preferredDate.trim() && formData.preferredTime.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStepValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is authenticated before submitting
    if (!user) {
      setShowSignUpDialog(true);
      return;
    }

    setLoading(true);

    try {
      const scrapTypes = [
        {
          type: formData.scrapType,
          weight: parseFloat(formData.estimatedWeight) || 0
        }
      ];

      // Create complete address string
      const completeAddress = `${formData.houseNumber}, ${formData.village}`;

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: completeAddress,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            district: formData.district,
            scrap_types: scrapTypes,
            total_weight: parseFloat(formData.estimatedWeight) || null,
            pickup_date: formData.preferredDate,
            pickup_time: formData.preferredTime,
            special_instructions: formData.additionalNotes,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: "Your pickup has been scheduled. We'll contact you soon with confirmation details.",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: user?.email || '',
        houseNumber: '',
        village: '',
        city: '',
        district: '',
        pincode: '',
        state: '',
        scrapType: '',
        estimatedWeight: '',
        preferredDate: '',
        preferredTime: '',
        additionalNotes: ''
      });
      setCurrentStep(1);
      
      // Navigate to home
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={{
              name: formData.name,
              phone: formData.phone,
            }}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <AddressInput
            formData={{
              houseNumber: formData.houseNumber,
              village: formData.village,
              city: formData.city,
              district: formData.district,
              pincode: formData.pincode,
              state: formData.state,
            }}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <ScrapDetailsStep
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <ScheduleStep
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Pickup Address';
      case 3: return 'Scrap Details';
      case 4: return 'Schedule Pickup';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Book Your <span className="text-green-600">Pickup</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Schedule your scrap collection in just a few simple steps
          </p>
        </div>

        {!user && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <User className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-800">Sign Up Required</h3>
                <p className="text-amber-700 text-sm sm:text-base">
                  You can fill out your booking details, but you'll need to sign up to complete your booking.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/auth')} 
                className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 mb-6 sm:mb-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />
          
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{getStepTitle()}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                >
                  {loading ? 'Booking...' : 'Book Pickup'}
                </Button>
              )}
            </div>
          </form>
        </div>

        <TrustSection />
      </div>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <LogIn className="w-5 h-5 text-green-600" />
              <span>Sign Up Required</span>
            </DialogTitle>
            <DialogDescription>
              You need to create an account to complete your booking. Your booking details will be saved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-green-600 hover:bg-green-700"
            >
              Sign Up & Complete Booking
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowSignUpDialog(false)}
            >
              Continue Filling Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingForm;

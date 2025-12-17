
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const stepNames = ['Personal Information', 'Scrap Details', 'Schedule & Preferences'];

  return (
    <div className="mb-12">
      <div className="flex justify-center items-center space-x-4 mb-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
              ${currentStep >= step 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
            </div>
            {step < totalSteps && (
              <div className={`
                w-16 h-1 mx-2 transition-all duration-300
                ${currentStep > step ? 'bg-green-600' : 'bg-gray-200'}
              `}></div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">
          Step {currentStep} of {totalSteps}: {stepNames[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;

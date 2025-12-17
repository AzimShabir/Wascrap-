
import { Package, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ScrapDetailsStepProps {
  formData: {
    scrapType: string;
    estimatedWeight: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ScrapDetailsStep = ({ formData, handleChange }: ScrapDetailsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Scrap Details</h3>
        <p className="text-gray-600">Tell us about the materials you want to sell</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <Package className="w-5 h-5 mr-2 text-green-600" />
            Scrap Type *
          </label>
          <select
            name="scrapType"
            value={formData.scrapType}
            onChange={handleChange}
            className="w-full h-14 text-lg bg-white border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 focus:outline-none transition-colors"
            required
          >
            <option value="">Select scrap type</option>
            <option value="paper">📄 Paper & Cardboard (₹9-10/kg)</option>
            <option value="plastic">🧴 Plastic Materials (₹8-12/kg)</option>
            <option value="metal">⚙️ Metal & Electronics (₹15-25/kg)</option>
            <option value="glass">🥤 Glass & Others (₹5-8/kg)</option>
            <option value="mixed">📦 Mixed Scrap (₹9.5/kg)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <Package className="w-5 h-5 mr-2 text-green-600" />
            Estimated Weight (kg)
          </label>
          <Input
            type="number"
            name="estimatedWeight"
            value={formData.estimatedWeight}
            onChange={handleChange}
            placeholder="Approximate weight in kg"
            className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
            min="1"
          />
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h4 className="font-bold text-green-800 mb-2 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Bonus Offer
        </h4>
        <p className="text-green-700">
          If you arrange your own transport, we'll add <strong>₹1.05/kg extra</strong> as transport incentive to your total payment!
        </p>
      </div>
    </div>
  );
};

export default ScrapDetailsStep;

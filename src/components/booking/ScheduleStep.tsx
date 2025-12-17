
import { Calendar, Clock, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ScheduleStepProps {
  formData: {
    preferredDate: string;
    preferredTime: string;
    additionalNotes: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ScheduleStep = ({ formData, handleChange }: ScheduleStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Schedule Pickup</h3>
        <p className="text-gray-600">Choose your preferred date and time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Preferred Date
          </label>
          <Input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-800 font-semibold text-lg">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Preferred Time
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full h-14 text-lg bg-white border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 focus:outline-none transition-colors"
          >
            <option value="">Select time slot</option>
            <option value="morning">🌅 Morning (9 AM - 12 PM)</option>
            <option value="afternoon">☀️ Afternoon (12 PM - 4 PM)</option>
            <option value="evening">🌆 Evening (4 PM - 7 PM)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-gray-800 font-semibold text-lg">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Additional Notes
        </label>
        <Textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Any special instructions, access details, or additional information..."
          className="text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ScheduleStep;


import { useState } from 'react';
import { MapPin, Home, Building, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddressInputProps {
  formData: {
    houseNumber: string;
    village: string;
    city: string;
    district: string;
    pincode: string;
    state: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const AddressInput = ({ formData, handleChange, handleSelectChange }: AddressInputProps) => {
  const [addressType, setAddressType] = useState<'home' | 'office' | 'other'>('home');

  const indianStates = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value;
    handleChange(e);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Pickup Address</h3>
        <p className="text-gray-600">Please provide your complete address for pickup</p>
      </div>

      {/* Address Type Selection */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card 
          className={`p-4 cursor-pointer transition-all ${
            addressType === 'home' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
          onClick={() => setAddressType('home')}
        >
          <div className="text-center">
            <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Home</p>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all ${
            addressType === 'office' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
          onClick={() => setAddressType('office')}
        >
          <div className="text-center">
            <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Office</p>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all ${
            addressType === 'other' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
          onClick={() => setAddressType('other')}
        >
          <div className="text-center">
            <Navigation className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Other</p>
          </div>
        </Card>
      </div>

      {/* Step-by-Step Address Form */}
      <div className="space-y-6">
        {/* Step 1: House Number */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
            House/Flat Details
          </h4>
          <div className="space-y-2">
            <Label className="text-gray-800 font-semibold text-lg">
              House/Flat No., Building Name *
            </Label>
            <Input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              placeholder="e.g., 123, Green Apartments, Block A"
              className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Step 2: Village/Address */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-green-800 mb-4 flex items-center">
            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
            Village/Street Address
          </h4>
          <div className="space-y-2">
            <Label className="text-gray-800 font-semibold text-lg">
              Village/Street/Area Name *
            </Label>
            <Input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="e.g., MG Road, Koramangala, Village Name"
              className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Step 3: City & District */}
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-4 flex items-center">
            <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
            City & District
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-800 font-semibold text-lg">City *</Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city name"
                className="h-14 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-800 font-semibold text-lg">District *</Label>
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district name"
                className="h-14 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                required
              />
            </div>
          </div>
        </div>

        {/* Step 4: PIN Code */}
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h4 className="font-bold text-orange-800 mb-4 flex items-center">
            <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
            PIN Code
          </h4>
          <div className="space-y-2">
            <Label className="text-gray-800 font-semibold text-sm md:text-lg">PIN Code *</Label>
            <Input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handlePincodeChange}
              placeholder="Enter 6-digit PIN code"
              className="h-12 md:h-14 text-base md:text-lg border-2 border-gray-200 focus:border-orange-500 rounded-xl"
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
          </div>
        </div>

        {/* Step 5: State */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h4 className="font-bold text-red-800 mb-4 flex items-center">
            <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">5</span>
            State
          </h4>
          <div className="space-y-2">
            <Label className="text-gray-800 font-semibold text-sm md:text-lg">State *</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectChange('state', value)}
            >
              <SelectTrigger className="h-12 md:h-14 text-base md:text-lg border-2 border-gray-200 focus:border-red-500 rounded-xl">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state} className="text-base md:text-lg">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p className="text-blue-800 text-sm">
          <strong>📍 Pickup Instructions:</strong> Our team will arrive at the specified address during your chosen time slot. 
          Please ensure someone is available to hand over the scrap materials.
        </p>
      </div>
    </div>
  );
};

export default AddressInput;

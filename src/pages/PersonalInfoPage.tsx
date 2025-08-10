import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { FormField, Input, Select } from '../components/FormField';
import { useRegistration } from '../contexts/RegistrationContext';
import { validatePersonalInfo } from '../utils/validation';
import { calculateAge, getOccupationOptions } from '../utils/pricing';

export const PersonalInfoPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { personalInfo } = state.data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const age = personalInfo.dateOfBirth ? calculateAge(personalInfo.dateOfBirth) : 0;
  const occupationOptions = age > 0 ? getOccupationOptions(age) : [];

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });

    // Clear occupation type if age changes and current selection is no longer valid
    if (field === 'dateOfBirth' && personalInfo.occupationType) {
      const newAge = calculateAge(value);
      const newOptions = getOccupationOptions(newAge);
      if (!newOptions.includes(personalInfo.occupationType)) {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: { occupationType: '' }
        });
      }
    }
  };

  const handleNext = () => {
    const validationErrors = validatePersonalInfo(personalInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch({ type: 'SET_STEP', payload: 3 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 1 });
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Full Name" error={errors.fullName} required>
            <Input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              error={!!errors.fullName}
            />
          </FormField>

          <FormField label="Email Address" error={errors.email} required>
            <Input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              error={!!errors.email}
            />
          </FormField>

          <FormField label="Date of Birth" error={errors.dateOfBirth} required>
            <Input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              error={!!errors.dateOfBirth}
            />
          </FormField>

          <FormField label="Gender" error={errors.gender} required>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={personalInfo.gender === 'Male'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={personalInfo.gender === 'Female'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Female</span>
              </label>
            </div>
          </FormField>

          <FormField label="Phone Number" error={errors.phoneNumber} required>
            <Input
              type="tel"
              value={personalInfo.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+60 12-345 6789"
              error={!!errors.phoneNumber}
            />
          </FormField>

          {personalInfo.dateOfBirth && age > 12 && (
            <FormField label="Occupation Type" error={errors.occupationType} required>
              <Select
                value={personalInfo.occupationType}
                onChange={(e) => handleInputChange('occupationType', e.target.value)}
                error={!!errors.occupationType}
              >
                <option value="">Select occupation type</option>
                {occupationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormField>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Emergency Contact Details
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FormField label="Contact Name" error={errors.emergencyContactName} required>
              <Input
                type="text"
                value={personalInfo.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                placeholder="Emergency contact name"
                error={!!errors.emergencyContactName}
              />
            </FormField>

            <FormField label="Relationship" error={errors.emergencyContactRelationship} required>
              <Input
                type="text"
                value={personalInfo.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                placeholder="e.g., Spouse, Parent, Sibling"
                error={!!errors.emergencyContactRelationship}
              />
            </FormField>

            <FormField label="Contact Phone" error={errors.emergencyContactPhone} required>
              <Input
                type="tel"
                value={personalInfo.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                placeholder="+60 12-345 6789"
                error={!!errors.emergencyContactPhone}
              />
            </FormField>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};
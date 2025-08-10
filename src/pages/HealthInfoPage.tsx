import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { FormField, Textarea } from '../components/FormField';
import { useRegistration } from '../contexts/RegistrationContext';
import { validateHealthInfo } from '../utils/validation';

export const HealthInfoPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { healthInfo } = state.data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: boolean | string) => {
    dispatch({
      type: 'UPDATE_HEALTH_INFO',
      payload: { [field]: value }
    });
  };

  const handleNext = () => {
    const validationErrors = validateHealthInfo(healthInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch({ type: 'SET_STEP', payload: 4 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Health Information
        </h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
            <div>
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">Important Notice</p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                The camp will serve a standard menu. Please inform us of any critical allergies or health conditions below.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="foodAllergies"
                checked={healthInfo.hasFoodAllergies}
                onChange={(e) => handleChange('hasFoodAllergies', e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="foodAllergies" 
                className="ml-3 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                I have food allergies
              </label>
            </div>

            {healthInfo.hasFoodAllergies && (
              <FormField 
                label="Please provide details about your food allergies" 
                error={errors.foodAllergiesDetails}
                required
              >
                <Textarea
                  value={healthInfo.foodAllergiesDetails}
                  onChange={(e) => handleChange('foodAllergiesDetails', e.target.value)}
                  placeholder="Please list all food allergies and their severity (e.g., nuts - anaphylaxis, shellfish - mild reaction)"
                  rows={4}
                  error={!!errors.foodAllergiesDetails}
                />
              </FormField>
            )}
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="healthConcerns"
                checked={healthInfo.hasHealthConcerns}
                onChange={(e) => handleChange('hasHealthConcerns', e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="healthConcerns" 
                className="ml-3 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                I have health concerns or medical conditions
              </label>
            </div>

            {healthInfo.hasHealthConcerns && (
              <FormField 
                label="Please provide details about your health concerns" 
                error={errors.healthConcernsDetails}
                required
              >
                <Textarea
                  value={healthInfo.healthConcernsDetails}
                  onChange={(e) => handleChange('healthConcernsDetails', e.target.value)}
                  placeholder="Please describe any medical conditions, medications, or health concerns we should be aware of"
                  rows={4}
                  error={!!errors.healthConcernsDetails}
                />
              </FormField>
            )}
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
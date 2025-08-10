import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, AlertCircle, RefreshCcw, Users as UsersIcon, CreditCard, Shield } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useRegistration } from '../contexts/RegistrationContext';

export const TermsPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!state.data.termsAccepted) {
      setError('You must accept the Terms & Conditions to proceed');
      return;
    }

    setError('');
    dispatch({ type: 'SET_STEP', payload: 6 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 4 });
  };

  const handleTermsChange = (accepted: boolean) => {
    dispatch({ type: 'SET_TERMS_ACCEPTED', payload: accepted });
    if (accepted) setError('');
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3" />
          Terms & Conditions
        </h2>

        <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 space-y-6">
          
          {/* No Refunds Policy */}
          <div className="border-l-4 border-red-500 pl-4">
            <div className="flex items-center mb-2">
              <RefreshCcw className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Refunds Policy</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              All registration fees are non-refundable once payment has been processed. This includes situations where 
              participants cannot attend due to personal reasons, illness, or other circumstances. Please ensure your 
              availability before completing registration.
            </p>
          </div>

          {/* Family Policy */}
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center mb-2">
              <UsersIcon className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Family Registration Policy</h3>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Family Package discount applies only to immediate family members (spouse and children)</li>
              <li>• Minimum 3 family members required (1 parent + 2 children or spouse + 1 child)</li>
              <li>• Extended family members (grandparents, aunts, uncles, etc.) must register separately</li>
              <li>• Family members must stay in the same accommodation unit when possible</li>
            </ul>
          </div>

          {/* Payment Policy */}
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center mb-2">
              <CreditCard className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Policy</h3>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Payment must be completed within 7 days of registration</li>
              <li>• Bank transfer requires valid payment proof upload</li>
              <li>• Early Bird discount applies only to registrations completed before July 26, 2026</li>
              <li>• Deferred payment option available with additional administrative fee</li>
            </ul>
          </div>

          {/* Health & Safety */}
          <div className="border-l-4 border-orange-500 pl-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Health & Safety</h3>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Participants must disclose all relevant health conditions and allergies</li>
              <li>• The camp reserves the right to refuse accommodation based on undisclosed health risks</li>
              <li>• Emergency contact information must be accurate and reachable</li>
              <li>• Participants attend the camp at their own risk</li>
            </ul>
          </div>

          {/* Code of Conduct */}
          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code of Conduct</h3>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Respectful behavior towards all participants and staff is required</li>
              <li>• No alcohol, drugs, or inappropriate materials permitted</li>
              <li>• Quiet hours from 10 PM to 7 AM must be observed</li>
              <li>• Damage to property will result in additional charges</li>
            </ul>
          </div>

          {/* Accommodation Terms */}
          <div className="border-l-4 border-teal-500 pl-4">
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-teal-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accommodation Terms</h3>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Check-in: August 29, 2026 from 2:00 PM onwards</li>
              <li>• Check-out: August 31, 2026 by 12:00 PM</li>
              <li>• Room assignments are final and cannot be changed without valid reasons</li>
              <li>• Additional guests not permitted in accommodation units</li>
            </ul>
          </div>

          {/* Privacy Policy */}
          <div className="border-l-4 border-gray-500 pl-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Data Protection</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Personal information collected during registration will be used solely for camp administration purposes. 
              We will not share your information with third parties without consent, except as required by law. 
              Photos and videos taken during the camp may be used for promotional purposes.
            </p>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={state.data.termsAccepted}
              onChange={(e) => handleTermsChange(e.target.checked)}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="termsAccepted" className="ml-3 text-base text-gray-700 dark:text-gray-200">
              I have read and agree to the <strong>Terms & Conditions</strong> outlined above
            </label>
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleNext} disabled={!state.data.termsAccepted}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};
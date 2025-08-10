import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Clock, Building2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { useRegistration } from '../contexts/RegistrationContext';
import { validatePaymentInfo } from '../utils/validation';

// PASTE DEPLOYED GOOGLE APPS SCRIPT URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6H73tbesTT96PSY7tMOHFv_L8_R6llT2L5EESxkyleG4WU6GOsp8N-ElOpUeza42F/exec';

export const PaymentPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { paymentInfo } = state.data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // The type for method is now explicit, matching the allowed values
  const handlePaymentMethodChange = (method: 'bank' | 'deferred') => {
    dispatch({
      type: 'UPDATE_PAYMENT_INFO',
      payload: { method }
    });
  };

  const handleFileSelect = (file: File | null) => {
    dispatch({
      type: 'UPDATE_PAYMENT_INFO',
      payload: { proofFile: file }
    });
  };

  const handleSubmit = async () => {
    setErrors({});
    setSubmissionError('');

    const validationErrors = validatePaymentInfo(paymentInfo.method, paymentInfo.proofFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      personalInfo: state.data.personalInfo,
      healthInfo: state.data.healthInfo,
      familyInfo: state.data.familyInfo,
      termsAccepted: state.data.termsAccepted,
      paymentInfo: { method: state.data.paymentInfo.method },
      priceBreakdown: state.priceBreakdown,
    };
    
    const formData = new FormData();
    formData.append('data', JSON.stringify(submissionData));
    
    if (paymentInfo.proofFile) {
      formData.append('paymentProof', paymentInfo.proofFile);
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(responseData.message || 'An unknown error occurred on the server.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(`Failed to submit registration. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 6 });
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toFixed(2)}`;
  };
  
  if (isSubmitted) {
    return (
      <Layout showProgress={false}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registration Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for registering! Your submission has been received and you should get a confirmation email shortly.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Total Amount Paid/Due: {formatCurrency(state.priceBreakdown.grandTotal)}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Total Amount Due</h2>
            <div className="text-4xl font-bold">{formatCurrency(state.priceBreakdown.grandTotal)}</div>
          </div>
        </div>
        
        {submissionError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <div>
                <strong className="font-bold">Submission Failed!</strong>
                <span className="block sm:inline ml-2">{submissionError}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Payment Method</h3>
          {errors.paymentMethod && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{errors.paymentMethod}</p>}
          <div className="space-y-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${paymentInfo.method === 'bank' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-600'}`}
              onClick={() => handlePaymentMethodChange('bank')}>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="bank" 
                  name="paymentMethod" 
                  value="bank" 
                  checked={paymentInfo.method === 'bank'}
                  readOnly // Add readOnly as we are controlling state via the parent onClick
                />
                <label htmlFor="bank" className="ml-3 flex items-center cursor-pointer">
                  <Building2 className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Bank Transfer</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Transfer to our bank account and upload proof</div>
                  </div>
                </label>
              </div>
            </div>
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${paymentInfo.method === 'deferred' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-600'}`}
              onClick={() => handlePaymentMethodChange('deferred')}>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="deferred" 
                  name="paymentMethod" 
                  value="deferred" 
                  checked={paymentInfo.method === 'deferred'} 
                  readOnly // Add readOnly as we are controlling state via the parent onClick
                />
                <label htmlFor="deferred" className="ml-3 flex items-center cursor-pointer">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Deferred Payment</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pay later (subject to admin approval)</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {paymentInfo.method === 'bank' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" /> Bank Transfer Details
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank:</span><p className="font-medium">CIMB Bank Berhad</p></div>
                <div><span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Name:</span><p className="font-medium">Church Camp 2026</p></div>
                <div><span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Number:</span><p className="font-medium">1234567890123</p></div>
                <div><span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference:</span><p className="font-medium">CAMP2026-{state.data.personalInfo.fullName.replace(/\s+/g, '').substring(0, 10).toUpperCase()}</p></div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Payment Proof</h4>
              <FileUpload onFileSelect={handleFileSelect} error={errors.paymentProof} currentFile={paymentInfo.proofFile} />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Complete Registration'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};
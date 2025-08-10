import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Clock, Building2, CheckCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { useRegistration } from '../contexts/RegistrationContext';
import { validatePaymentInfo } from '../utils/validation';

export const PaymentPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { paymentInfo } = state.data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePaymentMethodChange = (method: string) => {
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
    const validationErrors = validatePaymentInfo(paymentInfo.method, paymentInfo.proofFile);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Google Apps Script endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, you would:
      // 1. Convert file to base64 if present
      // 2. Send all data to Google Apps Script
      // 3. Handle response
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error
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
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Registration Successful!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for registering for Church Camp 2026. Your registration has been received and is now being processed.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's Next?</h3>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• You will receive a confirmation email within 24 hours</li>
                <li>• If you selected bank transfer, your payment will be verified within 2-3 business days</li>
                <li>• Further camp information will be sent closer to the event date</li>
                <li>• Contact us if you have any questions or concerns</li>
              </ul>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Registration ID: {Math.floor(Math.random() * 9000) + 1000}</p>
              <p>Total Amount: {formatCurrency(state.priceBreakdown.grandTotal)}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Final Price Display */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Total Amount Due</h2>
            <div className="text-4xl font-bold">
              {formatCurrency(state.priceBreakdown.grandTotal)}
            </div>
            <p className="text-teal-100 mt-2">
              Complete your payment to secure your registration
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Select Payment Method
          </h3>

          {errors.paymentMethod && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{errors.paymentMethod}</p>
          )}

          <div className="space-y-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                paymentInfo.method === 'bank'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => handlePaymentMethodChange('bank')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentInfo.method === 'bank'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="bank" className="ml-3 flex items-center cursor-pointer">
                  <Building2 className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Bank Transfer</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Transfer to our bank account and upload payment proof
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                paymentInfo.method === 'deferred'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => handlePaymentMethodChange('deferred')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="deferred"
                  name="paymentMethod"
                  value="deferred"
                  checked={paymentInfo.method === 'deferred'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="deferred" className="ml-3 flex items-center cursor-pointer">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Deferred Payment</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Pay later with additional administrative fee
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Transfer Details */}
        {paymentInfo.method === 'bank' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Bank Transfer Details
            </h3>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank:</span>
                  <p className="text-gray-900 dark:text-white font-medium">CIMB Bank Berhad</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Name:</span>
                  <p className="text-gray-900 dark:text-white font-medium">Church Camp 2026</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Number:</span>
                  <p className="text-gray-900 dark:text-white font-medium">1234567890123</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">SWIFT Code:</span>
                  <p className="text-gray-900 dark:text-white font-medium">CIBBMYKL</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference:</span>
                <p className="text-gray-900 dark:text-white font-medium">
                  CAMP2026-{state.data.personalInfo.fullName.replace(/\s+/g, '').substring(0, 10).toUpperCase()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Please include this reference in your transfer description
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Upload Payment Proof
              </h4>
              <FileUpload
                onFileSelect={handleFileSelect}
                error={errors.paymentProof}
                currentFile={paymentInfo.proofFile}
                accept="image/jpeg,image/png,application/pdf"
                maxSize={1024 * 1024} // 1MB
              />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Complete Registration'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};
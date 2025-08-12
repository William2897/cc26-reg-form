import React from 'react';
import { MapPin, Calendar, Users, Phone, Mail, ArrowRight, Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { CountdownTimer } from '../components/CountdownTimer';
import { useRegistration } from '../contexts/RegistrationContext';

export const WelcomePage: React.FC = () => {
  const { dispatch } = useRegistration();

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  return (
    <Layout showProgress={false}>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            DAHC Church Camp 2026
          </h1>
            <h2 className="text-2xl md:text-5xl text-teal-600 dark:text-teal-400 font-semibold mb-4">
            "Why, God?"
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join us as we explore life's deepest questions and discover God's purposes together
            </p>
          
          <div className="max-w-md mx-auto mb-8">
            <CountdownTimer />
          </div>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-teal-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Port Dickson Methodist Centre
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-teal-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Date</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              29-31 August, 2026
            </p>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Important Information</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Early Bird Special</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Complete registration and payment before July 26, 2026 to save RM 20 per person
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Family Package</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                5% discount for families with parent + 2 or more immediate family members
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Children Policy</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Children below 4 years attend free (not eligible for Early Bird discount)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Payment Proof</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Valid proof of payment required for Bank Transfer method
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Need Help?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-teal-500 mr-3" />
              <span className="text-gray-600 dark:text-gray-300">support@churchcamp2026.org</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-teal-500 mr-3" />
              <span className="text-gray-600 dark:text-gray-300">+60 12-345 6789</span>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Register Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};
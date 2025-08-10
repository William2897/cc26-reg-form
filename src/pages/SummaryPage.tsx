import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Edit, User, Users as UsersIcon, Heart, FileText, Bed, Calculator } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useRegistration } from '../contexts/RegistrationContext';
import { calculatePricing, calculateAge } from '../utils/pricing';

export const SummaryPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { personalInfo, healthInfo, familyInfo } = state.data;

  // Calculate and update pricing when component mounts or data changes
  useEffect(() => {
    const priceBreakdown = calculatePricing(
      personalInfo,
      familyInfo.familyMembers,
      familyInfo.accommodationChoice
    );
    
    dispatch({
      type: 'UPDATE_PRICE_BREAKDOWN',
      payload: priceBreakdown
    });
  }, [personalInfo, familyInfo, dispatch]);

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 5 });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 7 });
  };

  const handleEdit = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toFixed(2)}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Registration Summary
          </h2>

          {/* Main Registrant Details */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Main Registrant
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleEdit(2)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                <p className="text-gray-900 dark:text-white">{personalInfo.fullName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                <p className="text-gray-900 dark:text-white">{personalInfo.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Age:</span>
                <p className="text-gray-900 dark:text-white">
                  {calculateAge(personalInfo.dateOfBirth)} years old
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupation:</span>
                <p className="text-gray-900 dark:text-white">{personalInfo.occupationType}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                <p className="text-gray-900 dark:text-white">{personalInfo.phoneNumber}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender:</span>
                <p className="text-gray-900 dark:text-white">{personalInfo.gender}</p>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Health Information
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleEdit(3)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Food Allergies:</span>
                  <p className="text-gray-900 dark:text-white">
                    {healthInfo.hasFoodAllergies ? healthInfo.foodAllergiesDetails : 'None reported'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Health Concerns:</span>
                  <p className="text-gray-900 dark:text-white">
                    {healthInfo.hasHealthConcerns ? healthInfo.healthConcernsDetails : 'None reported'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Members */}
          {familyInfo.isRegisteringFamily && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  Family Members ({familyInfo.familyMembers.length})
                </h3>
                <Button variant="outline" size="sm" onClick={() => handleEdit(4)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                {familyInfo.familyMembers.map((member, index) => (
                  <div key={member.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {member.fullName} (Age: {calculateAge(member.dateOfBirth)})
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500 dark:text-gray-400">Occupation:</span>
                        <p className="text-gray-900 dark:text-white">{member.occupationType}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 dark:text-gray-400">Food Allergies:</span>
                        <p className="text-gray-900 dark:text-white">
                          {member.hasFoodAllergies ? 'Yes' : 'None'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 dark:text-gray-400">Health Concerns:</span>
                        <p className="text-gray-900 dark:text-white">
                          {member.hasHealthConcerns ? 'Yes' : 'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accommodation */}
          {familyInfo.isRegisteringFamily && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  Accommodation
                </h3>
                <Button variant="outline" size="sm" onClick={() => handleEdit(4)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-900 dark:text-white">
                  {familyInfo.accommodationChoice === 'regular' && 'Regular Twin Room'}
                  {familyInfo.accommodationChoice === 'suite' && 'Two-Room Suite (+RM 200)'}
                  {familyInfo.accommodationChoice === 'mattress' && 'Extra Mattress (+RM 100)'}
                </p>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Terms & Conditions
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleEdit(5)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✓ Terms & Conditions accepted
              </p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Price Breakdown
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Main Registrant Fee:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatCurrency(state.priceBreakdown.mainRegistrantFee)}
              </span>
            </div>
            
            {state.priceBreakdown.familyMembersTotal > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Family Members Total:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {formatCurrency(state.priceBreakdown.familyMembersTotal)}
                </span>
              </div>
            )}
            
            {state.priceBreakdown.accommodationCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Accommodation Upgrade:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {formatCurrency(state.priceBreakdown.accommodationCost)}
                </span>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {formatCurrency(state.priceBreakdown.subtotal)}
                </span>
              </div>
            </div>
            
            {state.priceBreakdown.earlyBirdDiscount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Early Bird Discount:</span>
                <span className="font-medium">
                  -{formatCurrency(state.priceBreakdown.earlyBirdDiscount)}
                </span>
              </div>
            )}
            
            {state.priceBreakdown.familyDiscount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Family Package Discount (5%):</span>
                <span className="font-medium">
                  -{formatCurrency(state.priceBreakdown.familyDiscount)}
                </span>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">Grand Total:</span>
                <span className="text-teal-600 dark:text-teal-400">
                  {formatCurrency(state.priceBreakdown.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleNext}>
            Proceed to Payment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};
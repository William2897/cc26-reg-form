import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2, Users, Bed, Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { FormField, Input, Select, Textarea } from '../components/FormField';
import { useRegistration } from '../contexts/RegistrationContext';
import { validateFamilyInfo } from '../utils/validation';
import { calculateAge, getOccupationOptions } from '../utils/pricing';
import { FamilyMember } from '../types';

export const FamilyInfoPage: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const { familyInfo } = state.data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFamilyRegistrationChange = (isRegistering: boolean) => {
    dispatch({
      type: 'UPDATE_FAMILY_INFO',
      payload: {
        isRegisteringFamily: isRegistering,
        familyMembers: isRegistering ? familyInfo.familyMembers : []
      }
    });
  };

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      fullName: '',
      dateOfBirth: '',
      occupationType: '',
      hasFoodAllergies: false,
      foodAllergiesDetails: '',
      hasHealthConcerns: false,
      healthConcernsDetails: ''
    };

    dispatch({
      type: 'UPDATE_FAMILY_INFO',
      payload: {
        familyMembers: [...familyInfo.familyMembers, newMember]
      }
    });
  };

  const removeFamilyMember = (id: string) => {
    dispatch({
      type: 'UPDATE_FAMILY_INFO',
      payload: {
        familyMembers: familyInfo.familyMembers.filter(member => member.id !== id)
      }
    });
  };

  const updateFamilyMember = (id: string, field: string, value: string | boolean) => {
    const updatedMembers = familyInfo.familyMembers.map(member => {
      if (member.id === id) {
        const updatedMember = { ...member, [field]: value };
        
        // Clear occupation type if age changes and current selection is no longer valid
        if (field === 'dateOfBirth' && member.occupationType) {
          const newAge = calculateAge(value as string);
          const newOptions = getOccupationOptions(newAge);
          if (!newOptions.includes(member.occupationType)) {
            updatedMember.occupationType = '';
          }
        }
        
        return updatedMember;
      }
      return member;
    });

    dispatch({
      type: 'UPDATE_FAMILY_INFO',
      payload: { familyMembers: updatedMembers }
    });
  };

  const handleAccommodationChange = (choice: string) => {
    dispatch({
      type: 'UPDATE_FAMILY_INFO',
      payload: { accommodationChoice: choice }
    });
  };

  const isFormValid = () => {
    if (!familyInfo.isRegisteringFamily) return true;
    
    return familyInfo.familyMembers.length >= 2 && 
           familyInfo.familyMembers.every(member => 
             member.fullName.trim() && 
             member.dateOfBirth && 
             member.occupationType &&
             (!member.hasFoodAllergies || member.foodAllergiesDetails.trim()) &&
             (!member.hasHealthConcerns || member.healthConcernsDetails.trim())
           );
  };

  const handleNext = () => {
    const validationErrors = validateFamilyInfo(familyInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch({ type: 'SET_STEP', payload: 5 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 3 });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Family Registration Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Family Registration
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">Family Package Information</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                  The Family Package discount is for immediate family members only. A minimum of 3 family members 
                  (e.g., 1 parent + 2 children) are required to qualify. Other relatives must register separately.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="registerFamily"
              checked={familyInfo.isRegisteringFamily}
              onChange={(e) => handleFamilyRegistrationChange(e.target.checked)}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="registerFamily" className="ml-3 text-base font-medium text-gray-700 dark:text-gray-200">
              I am registering family members
            </label>
          </div>

          {errors.familyMembers && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{errors.familyMembers}</p>
          )}

          {familyInfo.isRegisteringFamily && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Family Members</h3>
                <Button onClick={addFamilyMember} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {familyInfo.familyMembers.map((member, index) => {
                const age = member.dateOfBirth ? calculateAge(member.dateOfBirth) : 0;
                const occupationOptions = age > 0 ? getOccupationOptions(age) : [];

                return (
                  <div key={member.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                        Family Member {index + 1}
                      </h4>
                      {familyInfo.familyMembers.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFamilyMember(member.id)}
                          className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <FormField 
                        label="Full Name" 
                        error={errors[`familyMember_${member.id}_fullName`]} 
                        required
                      >
                        <Input
                          type="text"
                          value={member.fullName}
                          onChange={(e) => updateFamilyMember(member.id, 'fullName', e.target.value)}
                          placeholder="Enter full name"
                          error={!!errors[`familyMember_${member.id}_fullName`]}
                        />
                      </FormField>

                      <FormField 
                        label="Date of Birth" 
                        error={errors[`familyMember_${member.id}_dateOfBirth`]} 
                        required
                      >
                        <Input
                          type="date"
                          value={member.dateOfBirth}
                          onChange={(e) => updateFamilyMember(member.id, 'dateOfBirth', e.target.value)}
                          error={!!errors[`familyMember_${member.id}_dateOfBirth`]}
                        />
                      </FormField>

                      {member.dateOfBirth && age >= 0 && (
                        <FormField 
                          label="Occupation Type" 
                          error={errors[`familyMember_${member.id}_occupationType`]} 
                          required
                          className="md:col-span-2"
                        >
                          <Select
                            value={member.occupationType}
                            onChange={(e) => updateFamilyMember(member.id, 'occupationType', e.target.value)}
                            error={!!errors[`familyMember_${member.id}_occupationType`]}
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

                    {/* Health Information for Family Member */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`allergies_${member.id}`}
                            checked={member.hasFoodAllergies}
                            onChange={(e) => updateFamilyMember(member.id, 'hasFoodAllergies', e.target.checked)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`allergies_${member.id}`} className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Has food allergies
                          </label>
                        </div>

                        {member.hasFoodAllergies && (
                          <FormField 
                            label="Food Allergies Details" 
                            error={errors[`familyMember_${member.id}_foodAllergiesDetails`]} 
                            required
                          >
                            <Textarea
                              value={member.foodAllergiesDetails}
                              onChange={(e) => updateFamilyMember(member.id, 'foodAllergiesDetails', e.target.value)}
                              placeholder="Describe food allergies"
                              rows={2}
                              error={!!errors[`familyMember_${member.id}_foodAllergiesDetails`]}
                            />
                          </FormField>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`health_${member.id}`}
                            checked={member.hasHealthConcerns}
                            onChange={(e) => updateFamilyMember(member.id, 'hasHealthConcerns', e.target.checked)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`health_${member.id}`} className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Has health concerns
                          </label>
                        </div>

                        {member.hasHealthConcerns && (
                          <FormField 
                            label="Health Concerns Details" 
                            error={errors[`familyMember_${member.id}_healthConcernsDetails`]} 
                            required
                          >
                            <Textarea
                              value={member.healthConcernsDetails}
                              onChange={(e) => updateFamilyMember(member.id, 'healthConcernsDetails', e.target.value)}
                              placeholder="Describe health concerns"
                              rows={2}
                              error={!!errors[`familyMember_${member.id}_healthConcernsDetails`]}
                            />
                          </FormField>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Accommodation Section */}
        {familyInfo.isRegisteringFamily && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Bed className="w-6 h-6 mr-3" />
              Accommodation Booking
            </h2>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                The base registration fee includes a Regular Twin Room. You can upgrade your accommodation below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <input
                  type="radio"
                  id="regular"
                  name="accommodation"
                  value="regular"
                  checked={familyInfo.accommodationChoice === 'regular'}
                  onChange={(e) => handleAccommodationChange(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="regular" className="ml-3 flex-1">
                  <div className="font-medium text-gray-700 dark:text-gray-200">Regular Twin Room</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Included in base price</div>
                </label>
              </div>

              <div className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <input
                  type="radio"
                  id="suite"
                  name="accommodation"
                  value="suite"
                  checked={familyInfo.accommodationChoice === 'suite'}
                  onChange={(e) => handleAccommodationChange(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="suite" className="ml-3 flex-1">
                  <div className="font-medium text-gray-700 dark:text-gray-200">Two-Room Suite</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">+RM 200 total • 8 units available</div>
                </label>
              </div>

              <div className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <input
                  type="radio"
                  id="mattress"
                  name="accommodation"
                  value="mattress"
                  checked={familyInfo.accommodationChoice === 'mattress'}
                  onChange={(e) => handleAccommodationChange(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="mattress" className="ml-3 flex-1">
                  <div className="font-medium text-gray-700 dark:text-gray-200">Extra Mattress</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">+RM 100 total • 8 units available</div>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleNext} disabled={!isFormValid()}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};
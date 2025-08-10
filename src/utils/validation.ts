import { PersonalInfo, HealthInfo, FamilyInfo, FamilyMember } from '../types';
import { calculateAge } from './pricing';

export interface ValidationErrors {
  [key: string]: string;
}

export const validatePersonalInfo = (personalInfo: PersonalInfo): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!personalInfo.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!personalInfo.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!personalInfo.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const age = calculateAge(personalInfo.dateOfBirth);
    if (age <= 12) {
      errors.dateOfBirth = 'Main registrant must be over 12 years old';
    }
  }

  if (!personalInfo.gender) {
    errors.gender = 'Please select your gender';
  }

  if (!personalInfo.phoneNumber || personalInfo.phoneNumber === '+60') {
    errors.phoneNumber = 'Phone number is required';
  }

  if (!personalInfo.emergencyContactName.trim()) {
    errors.emergencyContactName = 'Emergency contact name is required';
  }

  if (!personalInfo.emergencyContactRelationship.trim()) {
    errors.emergencyContactRelationship = 'Emergency contact relationship is required';
  }

  if (!personalInfo.emergencyContactPhone || personalInfo.emergencyContactPhone === '+60') {
    errors.emergencyContactPhone = 'Emergency contact phone is required';
  }

  if (!personalInfo.occupationType) {
    errors.occupationType = 'Please select an occupation type';
  }

  return errors;
};

export const validateHealthInfo = (healthInfo: HealthInfo): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (healthInfo.hasFoodAllergies && !healthInfo.foodAllergiesDetails.trim()) {
    errors.foodAllergiesDetails = 'Please provide details about food allergies';
  }

  if (healthInfo.hasHealthConcerns && !healthInfo.healthConcernsDetails.trim()) {
    errors.healthConcernsDetails = 'Please provide details about health concerns';
  }

  return errors;
};

export const validateFamilyMember = (member: FamilyMember): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!member.fullName.trim()) {
    errors[`familyMember_${member.id}_fullName`] = 'Full name is required';
  }

  if (!member.dateOfBirth) {
    errors[`familyMember_${member.id}_dateOfBirth`] = 'Date of birth is required';
  }

  if (!member.occupationType) {
    errors[`familyMember_${member.id}_occupationType`] = 'Please select an occupation type';
  }

  if (member.hasFoodAllergies && !member.foodAllergiesDetails.trim()) {
    errors[`familyMember_${member.id}_foodAllergiesDetails`] = 'Please provide allergy details';
  }

  if (member.hasHealthConcerns && !member.healthConcernsDetails.trim()) {
    errors[`familyMember_${member.id}_healthConcernsDetails`] = 'Please provide health concern details';
  }

  return errors;
};

export const validateFamilyInfo = (familyInfo: FamilyInfo): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (familyInfo.isRegisteringFamily) {
    if (familyInfo.familyMembers.length < 2) {
      errors.familyMembers = 'At least 2 family members are required for family package';
    }

    familyInfo.familyMembers.forEach(member => {
      const memberErrors = validateFamilyMember(member);
      Object.assign(errors, memberErrors);
    });
  }

  return errors;
};

export const validatePaymentInfo = (method: string, proofFile: File | null): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!method) {
    errors.paymentMethod = 'Please select a payment method';
  }

  if (method === 'bank' && !proofFile) {
    errors.paymentProof = 'Payment proof is required for bank transfer';
  }

  if (proofFile) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(proofFile.type)) {
      errors.paymentProof = 'Please upload a JPEG, PNG, or PDF file';
    }

    const maxSize = 1024 * 1024; // 1MB
    if (proofFile.size > maxSize) {
      errors.paymentProof = 'File size must be less than 1MB';
    }
  }

  return errors;
};
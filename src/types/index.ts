export interface PersonalInfo {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | '';
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  occupationType: string;
}

export interface HealthInfo {
  hasFoodAllergies: boolean;
  foodAllergiesDetails: string;
  hasHealthConcerns: boolean;
  healthConcernsDetails: string;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  dateOfBirth: string;
  occupationType: string;
  hasFoodAllergies: boolean;
  foodAllergiesDetails: string;
  hasHealthConcerns: boolean;
  healthConcernsDetails: string;
}

export interface FamilyInfo {
  isRegisteringFamily: boolean;
  familyMembers: FamilyMember[];
  accommodationChoice: 'regular' | 'suite' | 'mattress';
}

export interface PaymentInfo {
  method: 'bank' | 'deferred' | '';
  proofFile: File | null;
}

export interface PriceBreakdown {
  mainRegistrantFee: number;
  familyMembersTotal: number;
  accommodationCost: number;
  subtotal: number;
  earlyBirdDiscount: number;
  familyDiscount: number;
  grandTotal: number;
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  healthInfo: HealthInfo;
  familyInfo: FamilyInfo;
  termsAccepted: boolean;
  paymentInfo: PaymentInfo;
}
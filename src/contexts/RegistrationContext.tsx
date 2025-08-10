import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { RegistrationData, PersonalInfo, HealthInfo, FamilyInfo, PaymentInfo, PriceBreakdown } from '../types';

interface RegistrationState {
  currentStep: number;
  data: RegistrationData;
  priceBreakdown: PriceBreakdown;
}

type RegistrationAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_HEALTH_INFO'; payload: Partial<HealthInfo> }
  | { type: 'UPDATE_FAMILY_INFO'; payload: Partial<FamilyInfo> }
  | { type: 'UPDATE_PAYMENT_INFO'; payload: Partial<PaymentInfo> }
  | { type: 'SET_TERMS_ACCEPTED'; payload: boolean }
  | { type: 'UPDATE_PRICE_BREAKDOWN'; payload: PriceBreakdown };

const initialState: RegistrationState = {
  currentStep: 1,
  data: {
    personalInfo: {
      fullName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '+60',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '+60',
      occupationType: ''
    },
    healthInfo: {
      hasFoodAllergies: false,
      foodAllergiesDetails: '',
      hasHealthConcerns: false,
      healthConcernsDetails: ''
    },
    familyInfo: {
      isRegisteringFamily: false,
      familyMembers: [],
      accommodationChoice: 'regular'
    },
    termsAccepted: false,
    paymentInfo: {
      method: '',
      proofFile: null
    }
  },
  priceBreakdown: {
    mainRegistrantFee: 0,
    familyMembersTotal: 0,
    accommodationCost: 0,
    subtotal: 0,
    earlyBirdDiscount: 0,
    familyDiscount: 0,
    grandTotal: 0
  }
};

const registrationReducer = (state: RegistrationState, action: RegistrationAction): RegistrationState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_HEALTH_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          healthInfo: { ...state.data.healthInfo, ...action.payload }
        }
      };
    case 'UPDATE_FAMILY_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          familyInfo: { ...state.data.familyInfo, ...action.payload }
        }
      };
    case 'UPDATE_PAYMENT_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          paymentInfo: { ...state.data.paymentInfo, ...action.payload }
        }
      };
    case 'SET_TERMS_ACCEPTED':
      return {
        ...state,
        data: { ...state.data, termsAccepted: action.payload }
      };
    case 'UPDATE_PRICE_BREAKDOWN':
      return { ...state, priceBreakdown: action.payload };
    default:
      return state;
  }
};

const RegistrationContext = createContext<{
  state: RegistrationState;
  dispatch: React.Dispatch<RegistrationAction>;
} | null>(null);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
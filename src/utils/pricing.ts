import { PersonalInfo, FamilyMember } from '../types';

export const PRICES = {
  WORKING_ADULT: 240,
  STUDENT: 180,
  HOMEMAKER: 180,
  MINISTRY_SALARY: 240,
  MINISTRY_STIPEND: 180,
  CHILD_5_12: 50,
  CHILD_4_BELOW: 0
};

export const ACCOMMODATION_COSTS = {
  regular: 0,
  suite: 200,
  mattress: 100
};

export const EARLY_BIRD_DISCOUNT = 20;
export const FAMILY_DISCOUNT_PERCENTAGE = 0.05;
export const EARLY_BIRD_DEADLINE = new Date('2026-07-26T23:59:59+08:00');
export const EVENT_DATE = new Date('2026-08-29T00:00:00+08:00');

export const calculateAge = (dateOfBirth: string, referenceDate: Date = EVENT_DATE): number => {
  const birthDate = new Date(dateOfBirth);
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getOccupationPrice = (occupationType: string): number => {
  // Remove the price suffix if present
  const baseType = occupationType.split(' - RM ')[0];
  
  switch (baseType) {
    case 'Working Adult':
      return PRICES.WORKING_ADULT;
    case 'Student':
      return PRICES.STUDENT;
    case 'Homemaker':
      return PRICES.HOMEMAKER;
    case 'Ministry Worker - Salaried':
      return PRICES.MINISTRY_SALARY;
    case 'Ministry Worker - Stipend':
      return PRICES.MINISTRY_STIPEND;
    case 'Child (Ages 5-12)':
      return PRICES.CHILD_5_12;
    case 'Child (4 and Below)':
      return PRICES.CHILD_4_BELOW;
    default:
      return 0;
  }
};

export const getOccupationOptions = (age: number): string[] => {
  if (age <= 4) {
    return [`Child (4 and Below) - RM ${PRICES.CHILD_4_BELOW}`];
  } else if (age >= 5 && age <= 12) {
    return [`Child (Ages 5-12) - RM ${PRICES.CHILD_5_12}`];
  } else {
    return [
      `Working Adult - RM ${PRICES.WORKING_ADULT}`,
      `Student - RM ${PRICES.STUDENT}`,
      `Homemaker - RM ${PRICES.HOMEMAKER}`,
      `Ministry Worker - Salaried - RM ${PRICES.MINISTRY_SALARY}`,
      `Ministry Worker - Stipend - RM ${PRICES.MINISTRY_STIPEND}`
    ];
  }
};

export const isEligibleForEarlyBird = (occupationType: string): boolean => {
  const baseType = occupationType.split(' - RM ')[0];
  return baseType !== 'Child (4 and Below)';
};

export const calculatePricing = (
  personalInfo: PersonalInfo,
  familyMembers: FamilyMember[],
  accommodationChoice: string
) => {
  const now = new Date();
  const isEarlyBird = now <= EARLY_BIRD_DEADLINE;
  
  // Main registrant fee
  const mainRegistrantFee = getOccupationPrice(personalInfo.occupationType);
  
  // Family members total
  const familyMembersTotal = familyMembers.reduce((total, member) => {
    return total + getOccupationPrice(member.occupationType);
  }, 0);
  
  // Accommodation cost
  const accommodationCost = ACCOMMODATION_COSTS[accommodationChoice as keyof typeof ACCOMMODATION_COSTS] || 0;
  
  // Subtotal
  const subtotal = mainRegistrantFee + familyMembersTotal + accommodationCost;
  
  // Early bird discount
  let earlyBirdDiscount = 0;
  if (isEarlyBird) {
    if (isEligibleForEarlyBird(personalInfo.occupationType)) {
      earlyBirdDiscount += EARLY_BIRD_DISCOUNT;
    }
    familyMembers.forEach(member => {
      if (isEligibleForEarlyBird(member.occupationType)) {
        earlyBirdDiscount += EARLY_BIRD_DISCOUNT;
      }
    });
  }
  
  // Family discount (5% of registration fees, applied after early bird)
  const registrationFeesOnly = mainRegistrantFee + familyMembersTotal - earlyBirdDiscount;
  const familyDiscount = familyMembers.length >= 2 ? registrationFeesOnly * FAMILY_DISCOUNT_PERCENTAGE : 0;
  
  // Grand total
  const grandTotal = subtotal - earlyBirdDiscount - familyDiscount;
  
  return {
    mainRegistrantFee,
    familyMembersTotal,
    accommodationCost,
    subtotal,
    earlyBirdDiscount,
    familyDiscount,
    grandTotal: Math.max(0, grandTotal)
  };
};
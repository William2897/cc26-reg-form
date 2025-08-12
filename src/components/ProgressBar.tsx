import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  'Welcome',
  'Personal',
  'Health',
  'Family',
  'Terms',
  'Summary',
  'Payment'
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-teal-500 text-white shadow-md'
                    : isActive
                    ? 'bg-teal-500 text-white shadow-lg ring-2 ring-teal-200 dark:ring-teal-800'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              <span className={`mt-2 text-xs font-medium text-center ${
                isActive 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : isCompleted
                  ? 'text-teal-500 dark:text-teal-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
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
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-teal-500 text-white'
                    : isActive
                    ? 'bg-teal-500 text-white ring-4 ring-teal-200 dark:ring-teal-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              <span className={`mt-1 text-xs font-medium ${
                isActive 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;
            
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isCompleted
                    ? 'bg-teal-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
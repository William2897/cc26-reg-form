// ProgressBar.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, label: 'Welcome', shortLabel: 'Welcome' },
  { id: 2, label: 'Personal Info', shortLabel: 'Personal' },
  { id: 3, label: 'Health Details', shortLabel: 'Health' },
  { id: 4, label: 'Family Info', shortLabel: 'Family' },
  { id: 5, label: 'Terms & Conditions', shortLabel: 'Terms' },
  { id: 6, label: 'Summary', shortLabel: 'Summary' },
  { id: 7, label: 'Payment', shortLabel: 'Payment' }
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        {/* Progress Line */}
        <div className="relative mb-8">
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between relative z-10">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;
              const isFuture = step.id > currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  <div className="relative">
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg transform scale-105'
                          : isActive
                          ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 border-teal-500 shadow-lg ring-4 ring-teal-100 dark:ring-teal-900/50 transform scale-110'
                          : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    
                    {/* Pulse animation for active step */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-ping opacity-75" />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <span className={`text-sm font-medium block transition-colors duration-200 ${
                      isActive 
                        ? 'text-teal-600 dark:text-teal-400' 
                        : isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <div className="mt-1 w-2 h-2 bg-teal-500 rounded-full mx-auto animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        {/* Mobile Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="relative">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {steps[currentStep - 1]?.label}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
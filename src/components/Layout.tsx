import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ProgressBar } from './ProgressBar';
import { useRegistration } from '../contexts/RegistrationContext';

interface LayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showProgress = true }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { state } = useRegistration();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Church Camp 2026 Registration
              </h1>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {showProgress && (
        <div className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <ProgressBar currentStep={state.currentStep} totalSteps={7} />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
    </div>
  );
};
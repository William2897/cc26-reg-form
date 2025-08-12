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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            {/* Header Bar */}
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  CC'26 Registration
                </span>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 group border border-gray-200 dark:border-gray-600"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform duration-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-12 transition-transform duration-200" />
                )}
              </button>
            </div>
            
            {/* Progress Section */}
            {showProgress && (
              <div className="pb-6 pt-2">
                <ProgressBar currentStep={state.currentStep} totalSteps={7} />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
    </div>
  );
};
import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 ${
        error
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      } text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 resize-none ${
        error
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      } text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select: React.FC<SelectProps> = ({ error, className = '', ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 ${
        error
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      } text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  );
};
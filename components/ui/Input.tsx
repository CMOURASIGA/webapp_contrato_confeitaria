import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-brand-800 mb-1">
          {label}
          {props.required && <span className="text-accent-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`appearance-none block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-brand-200'} rounded-md shadow-sm placeholder-brand-400 focus:outline-none focus:ring-accent-400 focus:border-accent-400 sm:text-sm ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
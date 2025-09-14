"use client";

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

export function PasswordInput({ 
  value, 
  onChange,
  name,
  label,
  placeholder = "Password", 
  error,
  className = "",
  required
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          input input-bordered w-full pr-12
          ${error ? 'input-error' : ''}
          ${className}
        `}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

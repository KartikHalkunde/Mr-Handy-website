"use client";

interface FormInputProps {
  type: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
  min?: string;
  max?: string;
}

export function FormInput({ 
  type,
  value, 
  onChange,
  label,
  name,
  placeholder, 
  error,
  className = "",
  required,
  min,
  max
}: FormInputProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-gray-300">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className={`
          input input-bordered w-full bg-gray-800 text-white border-gray-700
          ${error ? 'input-error' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
}

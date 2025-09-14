export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation
export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Validate signup form
export function validateSignupForm(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Full name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Full name must be at least 2 characters' });
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (!isValidPassword(data.password)) {
    errors.push({ 
      field: 'password', 
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
    });
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate login form
export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

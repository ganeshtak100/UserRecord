import { FORM_VALIDATION } from '../constants/config';

export const validateEmail = (email: string): boolean => {
  return FORM_VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return FORM_VALIDATION.PHONE_REGEX.test(phone);
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateUserForm = (data: {
  name: string;
  email: string;
  phone: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Invalid phone format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
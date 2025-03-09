import {useCallback, useState} from 'react';
import {ValidationResult, validateUserForm} from '../utils/validation';

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  handleChange: (name: keyof T, value: string) => void;
  handleSubmit: () => ValidationResult;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({...prev, [name]: value}));
    setErrors(prev => ({...prev, [name]: ''}));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationResult = validateUserForm(values);
    setErrors(validationResult.errors);
    return validationResult;
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

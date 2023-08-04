import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { ValidationResult } from "../utils";

interface FormValidationHook<T> {
  /**
   * Indicator if form is loading.
   */
  formIsLoading: boolean;
  /**
   * Indicator if form is dirty, i.e if the form has been attempted to submit at least once.
   */
  formIsDirty: boolean;
  /**
   * Indicator if all fields have a value.
   */
  formHasValues: boolean;
  /**
   * The current state of the field validations.
   */
  fieldValidation: { [Key in keyof T]: ValidationResult };
  /**
   * Method for validating single field.
   */
  validateField: (id: keyof T, value: string) => void;
  /**
   * Method for validating the form as a whole.
   */
  validateForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

interface FormValidationHookProps<T> {
  formData: { [Key in keyof T]: string };
  validationRules: { [Key in keyof T]: (value: string) => ValidationResult };
  defaultFieldValidation: { [Key in keyof T]: ValidationResult };
  onFormSubmit: () => Promise<void> | undefined;
  isEditMode?: boolean;
}

/**
 * Custom hook for handling form validation.
 * @see {@link FormValidationHook}
 */
export const useFormValidation = <T>({
  formData,
  validationRules,
  defaultFieldValidation,
  onFormSubmit,
  isEditMode,
}: FormValidationHookProps<T>): FormValidationHook<T> => {
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [fieldValidation, setFieldValidation] = useState(
    defaultFieldValidation
  );
  const initialFormData = useRef(formData);
  const formDataHasChanged = useMemo(
    () =>
      !!isEditMode
        ? JSON.stringify(initialFormData.current) !== JSON.stringify(formData)
        : true,
    [formData, isEditMode]
  );

  const formHasValues = useMemo(
    () =>
      Object.values(formData).every((field) => (field as string).length) &&
      formDataHasChanged,
    [formData, formDataHasChanged]
  );

  const validateField = useCallback(
    (id: keyof T, value: string) => {
      const result = validationRules[id](value);
      setFieldValidation({ ...fieldValidation, [id]: result });
    },
    [fieldValidation, validationRules]
  );

  const validateForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormIsDirty(true);

      const formIsValid = Object.values(fieldValidation).every(
        (field) => (field as ValidationResult).isValid === true
      );

      if (!formIsValid) {
        return;
      }

      setFormIsLoading(true);
      await onFormSubmit();
      setFormIsLoading(false);
    },
    [fieldValidation, onFormSubmit]
  );

  return {
    validateField,
    fieldValidation,
    formHasValues,
    validateForm,
    formIsDirty,
    formIsLoading,
  };
};

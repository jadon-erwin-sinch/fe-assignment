export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates whether value is a valid string without special characters.
 *
 * @param value The value to validate.
 * @returns The validation result for given rules.
 */
export const isValidString = (value: string): ValidationResult => {
  const regex = /^[0-9a-zA-Z\-_.\s]+$/;

  if (regex.test(value)) {
    return { isValid: true };
  }

  return { isValid: false, message: "Invalid text value" };
};

/**
 * Validates whether value is a valid json string.
 *
 * @param value The value to validate.
 * @returns The validation result for given rules.
 */
export const isValidJSON = (value: string): ValidationResult => {
  try {
    JSON.parse(value);
  } catch (e) {
    return { isValid: false, message: "Invalid JSON value" };
  }

  return { isValid: true };
};

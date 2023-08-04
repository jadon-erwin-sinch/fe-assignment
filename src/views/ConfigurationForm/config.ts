import { ValidationResult, isValidJSON } from "../../utils";

export interface ConfigurationFieldValidation {
  configJson: ValidationResult;
}

export const configurationValidationRules: {
  [Key in keyof ConfigurationFormData]: (value: string) => ValidationResult;
} = {
  configJson: isValidJSON,
};

export interface ConfigurationFormData {
  configJson: string;
}

export const configurationDefaultFormData: ConfigurationFormData = {
  configJson: "",
};

export const configurationDefaultFieldValidation = (
  defaultValidity: boolean = false
): ConfigurationFieldValidation => ({
  configJson: { isValid: defaultValidity },
});

export const mapPrepopulatedConfigurationData = (
  prepopulatedData?: object
): ConfigurationFormData => {
  if (prepopulatedData) {
    return {
      ...configurationDefaultFormData,
      configJson: JSON.stringify(prepopulatedData, undefined, 4),
    };
  }

  return configurationDefaultFormData;
};

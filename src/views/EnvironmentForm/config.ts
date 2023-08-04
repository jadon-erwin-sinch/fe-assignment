import { ChangeEvent } from "react";
import { ValidationResult, isValidString } from "../../utils";
import {
  ConfigurationFieldValidation,
  ConfigurationFormData,
  configurationDefaultFieldValidation,
  configurationDefaultFormData,
  configurationValidationRules,
} from "../ConfigurationForm";
import { EnvironmentInput } from "../../api";

export interface EnvironmentFieldValidation
  extends ConfigurationFieldValidation {
  envName: ValidationResult;
  envRegion: ValidationResult;
}

export type PartialEnvironmentFieldValidation = Pick<
  EnvironmentFieldValidation,
  "envName" | "envRegion"
>;

export const environmentValidationRules: {
  [Key in keyof EnvironmentFormData]: (value: string) => ValidationResult;
} = {
  envName: isValidString,
  envRegion: isValidString,
  ...configurationValidationRules,
};

export interface EnvironmentFormData extends ConfigurationFormData {
  envName: string;
  envRegion: string;
}

export type PartialEnvironmentFormData = Pick<
  EnvironmentFormData,
  "envName" | "envRegion"
>;

export const environmentDefaultFormData: EnvironmentFormData = {
  envName: "",
  envRegion: "",
  ...configurationDefaultFormData,
};

export const environmentDefaultFieldValidation = (
  defaultValidity: boolean = false
): PartialEnvironmentFieldValidation => ({
  envName: { isValid: defaultValidity },
  envRegion: { isValid: defaultValidity },
  ...configurationDefaultFieldValidation(defaultValidity),
});

export const mapPrepopulatedEnvironmentData = (
  prepopulatedData?: EnvironmentInput
): EnvironmentFormData | PartialEnvironmentFormData => {
  if (prepopulatedData) {
    return {
      envName: prepopulatedData.name,
      envRegion: prepopulatedData.region,
    };
  }

  return environmentDefaultFormData;
};

export type onFullEnvFormInputCallback = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  id: keyof EnvironmentFormData
) => void;

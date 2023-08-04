import { ChangeEvent } from "react";
import { ApplicationInput } from "../../api";
import { ValidationResult, isValidString } from "../../utils";
import {
  EnvironmentFieldValidation,
  EnvironmentFormData,
  environmentDefaultFieldValidation,
  environmentDefaultFormData,
  environmentValidationRules,
} from "../EnvironmentForm";

export interface ApplicationFieldValidation extends EnvironmentFieldValidation {
  appName: ValidationResult;
  appDescription: ValidationResult;
}

export type PartialApplicationFieldValidation = Pick<
  ApplicationFieldValidation,
  "appName" | "appDescription"
>;

export const applicationValidationRules: {
  [Key in keyof PartialApplicationFormData]: (
    value: string
  ) => ValidationResult;
} = {
  appName: isValidString,
  appDescription: isValidString,
  ...environmentValidationRules,
};

export interface ApplicationFormData extends EnvironmentFormData {
  appName: string;
  appDescription: string;
}

export type PartialApplicationFormData = Pick<
  ApplicationFormData,
  "appName" | "appDescription"
>;

export const applicationDefaultFormData: ApplicationFormData = {
  appName: "",
  appDescription: "",
  ...environmentDefaultFormData,
};

export const applicationDefaultFieldValidation = (
  defaultValidity: boolean = false
): PartialApplicationFieldValidation => ({
  appName: { isValid: defaultValidity },
  appDescription: { isValid: defaultValidity },
  ...environmentDefaultFieldValidation(defaultValidity),
});

export const mapPrepopulatedApplicationData = (
  prepopulatedData?: ApplicationInput
): ApplicationFormData | PartialApplicationFormData => {
  if (prepopulatedData) {
    return {
      appName: prepopulatedData.name,
      appDescription: prepopulatedData.description,
    };
  }

  return applicationDefaultFormData;
};

export type onFullAppFormInputCallback = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  id: keyof ApplicationFormData
) => void;

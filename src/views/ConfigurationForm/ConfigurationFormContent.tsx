import { FormFieldHeading, TextAreaField } from "../../components";
import { ChangeEvent } from "react";
import { ConfigurationFormData, ConfigurationFieldValidation } from "./config";
import { TestId } from "utils";

interface ConfigurationFormContentProps {
  formData: ConfigurationFormData;
  fieldValidation: ConfigurationFieldValidation;
  formIsDirty: boolean;
  onInputChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
    id: keyof ConfigurationFormData
  ) => void;
}

const ConfigurationFormContent = ({
  formData,
  fieldValidation,
  formIsDirty,
  onInputChange,
}: ConfigurationFormContentProps) => (
  <>
    <FormFieldHeading>Configuration details</FormFieldHeading>
    <TextAreaField
      value={formData.configJson}
      onInputChange={(e) => onInputChange(e, "configJson")}
      validation={fieldValidation.configJson}
      enableValidation={formIsDirty}
      id="configJson"
      label="JSON View"
      testId={TestId.ConfigJsonInput}
      errorTestId={TestId.ConfigJsonError}
    />
  </>
);

export default ConfigurationFormContent;

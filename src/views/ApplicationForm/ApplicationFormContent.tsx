import styled from "styled-components";
import { FormFieldHeading, InputField } from "../../components";
import { BREAKPOINT_MEDIUM, TestId } from "../../utils";
import { ChangeEvent } from "react";
import {
  PartialApplicationFieldValidation,
  PartialApplicationFormData,
} from "./config";

interface ApplicationFormContentProps {
  formData: PartialApplicationFormData;
  fieldValidation: PartialApplicationFieldValidation;
  formIsDirty: boolean;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement>,
    id: keyof PartialApplicationFormData
  ) => void;
}

const ApplicationFormContent = ({
  formData,
  fieldValidation,
  formIsDirty,
  onInputChange,
}: ApplicationFormContentProps) => (
  <>
    <FormFieldHeading>Application details</FormFieldHeading>
    <Fieldset>
      <InputField
        value={formData.appName}
        onInputChange={(e) => onInputChange(e, "appName")}
        validation={fieldValidation.appName}
        enableValidation={formIsDirty}
        id="appName"
        label="Name"
        testId={TestId.AppNameInput}
        errorTestId={TestId.AppNameError}
      />
      <InputField
        value={formData.appDescription}
        onInputChange={(e) => onInputChange(e, "appDescription")}
        validation={fieldValidation.appDescription}
        enableValidation={formIsDirty}
        id="appDescription"
        label="Description"
        testId={TestId.AppDescInput}
        errorTestId={TestId.AppDescError}
      />
    </Fieldset>
  </>
);

export default ApplicationFormContent;

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: 20px;

  @media (min-width: ${BREAKPOINT_MEDIUM}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

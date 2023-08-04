import styled from "styled-components";
import { FormFieldHeading, InputField } from "../../components";
import { BREAKPOINT_MEDIUM, TestId } from "../../utils";
import { ChangeEvent } from "react";
import {
  PartialEnvironmentFormData,
  PartialEnvironmentFieldValidation,
} from "./config";

interface EnvironmentFormContentProps {
  formData: PartialEnvironmentFormData;
  fieldValidation: PartialEnvironmentFieldValidation;
  formIsDirty: boolean;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement>,
    id: keyof PartialEnvironmentFormData
  ) => void;
}

const EnvironmentFormContent = ({
  formData,
  fieldValidation,
  formIsDirty,
  onInputChange,
}: EnvironmentFormContentProps) => {
  return (
    <>
      <FormFieldHeading>Environment details</FormFieldHeading>
      <Fieldset>
        <InputField
          value={formData.envName}
          onInputChange={(e) => onInputChange(e, "envName")}
          validation={fieldValidation.envName}
          enableValidation={formIsDirty}
          id="envName"
          label="Name"
          testId={TestId.EnvNameInput}
          errorTestId={TestId.EnvNameError}
        />
        <InputField
          value={formData.envRegion}
          onInputChange={(e) => onInputChange(e, "envRegion")}
          validation={fieldValidation.envRegion}
          enableValidation={formIsDirty}
          id="envRegion"
          label="Region"
          testId={TestId.EnvRegionInput}
          errorTestId={TestId.EnvRegionError}
        />
      </Fieldset>
    </>
  );
};

export default EnvironmentFormContent;

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: 20px;

  @media (min-width: ${BREAKPOINT_MEDIUM}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

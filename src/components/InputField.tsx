import { ChangeEvent, HTMLInputTypeAttribute, useMemo } from "react";
import styled from "styled-components";
import {
  ValidationResult,
  COLOR_GRAY_DARK,
  COLOR_GRAY_MEDIUM,
  COLOR_RED,
  FONT_SMALL,
  FONT_XSMALL,
  FONT_MEDIUM,
  TestIdProp,
  TestId,
} from "../utils";

interface InputFieldProps extends TestIdProp {
  id: string;
  label: string;
  value: string;
  validation: ValidationResult;
  enableValidation?: boolean;
  type?: HTMLInputTypeAttribute;
  errorTestId?: TestId;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  id,
  label,
  value,
  onInputChange,
  testId,
  errorTestId,
  enableValidation,
  validation: { isValid, message },
}: InputFieldProps) => {
  const showError = useMemo(
    () => enableValidation && !isValid && message,
    [enableValidation, isValid, message]
  );

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        id={id}
        onChange={onInputChange}
        data-testid={testId}
        value={value}
      />
      {showError && <Error data-testid={errorTestId}>{message}</Error>}
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.fieldset`
  margin-bottom: 30px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${FONT_SMALL};
  color: ${COLOR_GRAY_DARK};
`;

const Error = styled.span`
  font-size: ${FONT_XSMALL};
  color: ${COLOR_RED};
  position: absolute;
  top: 1px;
  right: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${FONT_MEDIUM};
  border-radius: 5px;
  border: 1px solid ${COLOR_GRAY_MEDIUM};
`;

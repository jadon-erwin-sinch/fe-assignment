import { FormEvent, ReactNode } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { TestId, TestIdProp } from "utils";

interface FormWrapperProps extends TestIdProp {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  hasValues: boolean;
}

const FormWrapper = ({
  children,
  onSubmit,
  isLoading,
  hasValues,
  testId,
}: FormWrapperProps) => {
  return (
    <Wrapper>
      <Form $isLoading={isLoading} onSubmit={onSubmit} data-testid={testId}>
        {children}
        <Button
          testId={TestId.FormSubmitButton}
          type="submit"
          title="Submit"
          disabled={!hasValues}
        />
      </Form>
    </Wrapper>
  );
};

export default FormWrapper;

const Wrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  padding: 0 20px;
`;

const Form = styled.form<{ $isLoading: boolean }>`
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};
  pointer-events: ${({ $isLoading }) => ($isLoading ? "none" : "auto")};
`;

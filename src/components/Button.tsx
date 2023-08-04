import styled from "styled-components";
import { COLOR_BLUE, COLOR_WHITE, FONT_SMALL, TestIdProp } from "../utils";
import { HTMLInputTypeAttribute } from "react";

interface ButtonProps extends TestIdProp {
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  onClick?: () => void;
  narrow?: boolean;
  invertedTheme?: boolean;
  backgroundColor?: string;
  color?: string;
  title: string;
}

const Button = ({
  type,
  disabled,
  title,
  narrow,
  onClick,
  invertedTheme,
  testId,
  backgroundColor = COLOR_BLUE,
  color = COLOR_WHITE,
}: ButtonProps) => {
  if (type === "submit") {
    return (
      <FormButton
        data-testid={testId}
        type={type}
        title={title}
        disabled={disabled}
        onClick={onClick}
      ></FormButton>
    );
  }

  return (
    <PlainButton
      disabled={disabled}
      onClick={onClick}
      $invertedTheme={invertedTheme}
      $narrow={narrow}
      $backgroundColor={backgroundColor}
      $color={color}
      data-testid={testId}
    >
      {title}
    </PlainButton>
  );
};

export default Button;

const FormButton = styled.input<{
  disabled?: boolean;
}>`
  height: 40px;
  background: ${COLOR_BLUE};
  border: 1px solid ${COLOR_BLUE};
  color: ${COLOR_WHITE};
  padding: 0 20px;
  border-radius: 5px;
  font-size: ${FONT_SMALL};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const PlainButton = styled.button<{
  disabled?: boolean;
  $invertedTheme?: boolean;
  $narrow?: boolean;
  $backgroundColor: string;
  $color: string;
}>`
  height: 40px;
  background: ${({ $invertedTheme, $backgroundColor, $color }) =>
    $invertedTheme ? $color : $backgroundColor};
  color: ${({ $invertedTheme, $backgroundColor, $color }) =>
    $invertedTheme ? $backgroundColor : $color};
  border: ${({ $backgroundColor }) => `1px solid ${$backgroundColor}`};
  padding: ${({ $narrow }) => ($narrow ? "0 10px" : "0 20px")};
  border-radius: 5px;
  font-size: ${FONT_SMALL};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

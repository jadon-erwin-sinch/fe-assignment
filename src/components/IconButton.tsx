import styled from "styled-components";
import {
  COLOR_GRAY_MEDIUM,
  COLOR_GREEN,
  COLOR_RED,
  COLOR_WHITE,
  TestIdProp,
} from "../utils";

export enum IconButtonThemes {
  Red = "red",
  Green = "green",
}

interface IconButtonProps extends TestIdProp {
  iconUrl: string;
  small?: boolean;
  theme?: IconButtonThemes;
  onClick: () => void;
}

const IconButton = ({
  iconUrl,
  onClick,
  small,
  theme,
  testId,
}: IconButtonProps) => (
  <Wrapper onClick={onClick} $small={small} $theme={theme} data-testid={testId}>
    <Image src={iconUrl} />
  </Wrapper>
);

export default IconButton;

const Wrapper = styled.button<{ $small?: boolean; $theme?: IconButtonThemes }>`
  position: relative;
  height: ${({ $small }) => ($small ? "25px" : "35px")};
  width: ${({ $small }) => ($small ? "25px" : "35px")};
  padding: ${({ $small }) => ($small ? "5px" : "8px")};
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  background: ${COLOR_WHITE};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $theme }) =>
    $theme === IconButtonThemes.Red
      ? COLOR_RED
      : $theme === IconButtonThemes.Green
      ? COLOR_GREEN
      : COLOR_GRAY_MEDIUM};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

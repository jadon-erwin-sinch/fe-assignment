import styled from "styled-components";
import { FONT_LARGE, COLOR_GRAY_DARK, COLOR_GRAY_LIGHT } from "../utils";
import { ReactNode } from "react";

const FormFieldHeading = ({ children }: { children: ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

export default FormFieldHeading;

const Wrapper = styled.h3`
  font-size: ${FONT_LARGE};
  margin-top: 0;
  margin-bottom: 20px;
  color: ${COLOR_GRAY_DARK};

  &:not(:first-of-type) {
    padding-top: 20px;
    border-top: 1px solid ${COLOR_GRAY_LIGHT};
  }
`;

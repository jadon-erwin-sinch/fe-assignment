import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { CONTAINER_WIDTH, FONT_SMALL } from "../utils";

interface BannerProps {
  children: ReactNode;
  backgroundColor: string;
  textColor: string;
}

const Banner = ({ children, backgroundColor, textColor }: BannerProps) => (
  <Wrapper $backgroundColor={backgroundColor} $textColor={textColor}>
    <Content>{children}</Content>
  </Wrapper>
);

export default Banner;

const translateInOut = keyframes`
  0% {
    transform: translateY(50px);
  }
  5% {
    transform: translateY(0);
  }
  95% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
`;

const Wrapper = styled.div<{ $backgroundColor: string; $textColor: string }>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  z-index: 1;
  animation: ${translateInOut} 5s forwards;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  padding: 5px 20px;
  margin: 0 auto;
  text-align: center;
  font-size: ${FONT_SMALL};
  font-weight: bold;
`;

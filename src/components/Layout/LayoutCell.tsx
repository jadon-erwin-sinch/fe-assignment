import styled, { css } from "styled-components";
import {
  COLOR_GRAY_MEDIUM,
  COLOR_WHITE,
  BREAKPOINT_LARGE,
  FONT_XLARGE,
  FONT_LARGE,
  Asset,
  BREAKPOINT_MEDIUM,
  TestIdProp,
} from "../../utils";
import { ReactNode } from "react";
import IconButton from "../IconButton";

interface LayoutCellProps extends TestIdProp {
  children: ReactNode;
  heading: string;
  onNavigateBack?: () => void;
  lockHeight?: boolean;
  isSticky?: boolean;
  headerContent?: ReactNode;
}

const LayoutCell = ({
  children,
  heading,
  onNavigateBack,
  lockHeight,
  headerContent,
  testId,
}: LayoutCellProps) => (
  <Wrapper data-testid={testId}>
    <Header>{headerContent && headerContent}</Header>
    <HeadingContainer>
      {onNavigateBack && (
        <BackButton>
          <IconButton
            small
            iconUrl={Asset.ArrowLeft}
            onClick={onNavigateBack}
          />
        </BackButton>
      )}
      <Heading>{heading}</Heading>
    </HeadingContainer>
    <Content $lockHeight={lockHeight}>{children}</Content>
  </Wrapper>
);

export default LayoutCell;

const Heading = styled.h2`
  font-size: ${FONT_LARGE};
  margin-top: 0;
  margin-bottom: -10px;
  display: inline-block;
  padding: 0 5px;
  margin-left: 15px;
  background-color: ${COLOR_WHITE};
  z-index: 1;
  align-self: flex-start;

  @media (min-width: ${BREAKPOINT_LARGE}px) {
    font-size: ${FONT_XLARGE};
  }
`;

const Header = styled.div`
  height: 60px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 5px;
`;

const HeadingContainer = styled.div`
  display: flex;
`;

const Content = styled.div<{ $lockHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 40px;
  border: 1px solid ${COLOR_GRAY_MEDIUM};
  border-radius: 10px;

  ${({ $lockHeight }) =>
    $lockHeight &&
    css`
      @media (min-width: ${BREAKPOINT_MEDIUM}px) {
        min-height: calc(100vh - 132px);
      }
    `}
`;

const ContentHeader = styled.div`
  position: absolute;
  right: 0;
  top: -57px;
  display: flex;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  &:last-of-type {
    ${ContentHeader} {
      top: -65px;

      @media (min-width: ${BREAKPOINT_MEDIUM}px) {
        top: -57px;
      }
    }
  }
`;

const BackButton = styled.div`
  position: relative;
  margin-bottom: -20px;
  margin-left: 10px;
  padding-left: 5px;
  z-index: 1;
`;

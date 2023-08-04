import { ReactNode } from "react";
import styled from "styled-components";
import { CONTAINER_WIDTH, BREAKPOINT_MEDIUM } from "../../utils";

const Layout = ({ children }: { children: ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

export default Layout;

const Wrapper = styled.main`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
  display: grid;
  grid-gap: 20px;

  @media (min-width: ${BREAKPOINT_MEDIUM}px) {
    grid-template-columns: 0.5fr 1fr;
    grid-gap: 40px;
  }
`;

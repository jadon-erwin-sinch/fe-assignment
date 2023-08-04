import { styled } from "styled-components";
import { LayoutCell } from "../components";
import { FONT_SMALL } from "../utils";

const CouldNotBeFound = () => {
  return (
    <LayoutCell heading="Page could not be found">
      <Wrapper>
        <Heading>Seems like the page you're looking for doesn't exist.</Heading>
        <Excerpt>Try another url.</Excerpt>
      </Wrapper>
    </LayoutCell>
  );
};

export default CouldNotBeFound;

const Wrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
  padding: 0 20px;
`;

const Heading = styled.p`
  font-size: ${FONT_SMALL};
  margin: 0;
`;

const Excerpt = styled.p`
  font-size: ${FONT_SMALL};
  margin-top: 5px;
`;

import { styled } from "styled-components";
import { LayoutCell } from "../components";
import { FONT_SMALL, TestId } from "../utils";

const NoResultsFound = () => {
  return (
    <LayoutCell heading="No results found" testId={TestId.NoResultsFound}>
      <Wrapper>
        <Heading>
          Unfortunately we couldn't find what you were looking for.
        </Heading>
        <Excerpt>Try searching for something else.</Excerpt>
      </Wrapper>
    </LayoutCell>
  );
};

export default NoResultsFound;

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

import { styled } from "styled-components";
import { LayoutCell } from "../components";
import { FONT_SMALL } from "../utils";

const EmptyView = () => {
  return (
    <LayoutCell heading="Nothing to show here">
      <Wrapper>
        <Heading>Seems like there aren't any applications yet.</Heading>
        <Excerpt>Add new ones in the list.</Excerpt>
      </Wrapper>
    </LayoutCell>
  );
};

export default EmptyView;

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

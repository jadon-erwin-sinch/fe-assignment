import { styled } from "styled-components";
import { LayoutCell } from "../../components";
import { COLOR_GRAY_LIGHT } from "../../utils";

const SkeletonPanel = () => {
  return (
    <Wrapper>
      <LayoutCell heading="">
        <Content>
          <Heading />
          <Dropdown />
          <Heading />
          <Dropdown />
        </Content>
      </LayoutCell>
    </Wrapper>
  );
};

export default SkeletonPanel;

const Wrapper = styled.section`
  margin-top: 13px;
`;

const Content = styled.div`
  margin-bottom: 20px;
  position: relative;
  padding: 0 20px;
`;

const Heading = styled.div`
  height: 20px;
  width: 30%;
  background-color: ${COLOR_GRAY_LIGHT};
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Dropdown = styled.div`
  height: 30px;
  width: 60%;
  background-color: ${COLOR_GRAY_LIGHT};
  border-radius: 20px;
  margin-bottom: 40px;
`;

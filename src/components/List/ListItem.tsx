import styled from "styled-components";
import {
  COLOR_BLACK,
  COLOR_GRAY_DARK,
  COLOR_GRAY_LIGHT,
  COLOR_WHITE,
  FONT_SMALL,
  FONT_XXSMALL,
} from "../../utils";
import { Link } from "react-router-dom";

interface ListItemProps {
  id: string;
  name: string;
  description: string;
  isActive?: boolean;
  index: number;
  testId?: string;
}

const ListItem = ({
  id,
  index,
  name,
  description,
  isActive,
  testId,
}: ListItemProps) => {
  return (
    <Wrapper id={id} data-testid={testId}>
      <Button to={`/${id}`} $isActive={isActive}>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Button>
    </Wrapper>
  );
};

export default ListItem;

const Button = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  text-decoration: none;
  background-color: ${({ $isActive }) =>
    $isActive ? COLOR_GRAY_LIGHT : COLOR_WHITE};
`;

const Wrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:first-of-type {
    ${Button} {
      border-top: 1px solid ${COLOR_GRAY_LIGHT};
    }
  }

  &:not(:last-of-type) {
    ${Button} {
      border-bottom: 1px solid ${COLOR_GRAY_LIGHT};
    }
  }
`;

const Name = styled.span`
  color: ${COLOR_BLACK};
  font-size: ${FONT_SMALL};
`;

const Description = styled.span`
  font-size: ${FONT_XXSMALL};
  color: ${COLOR_GRAY_DARK};
`;

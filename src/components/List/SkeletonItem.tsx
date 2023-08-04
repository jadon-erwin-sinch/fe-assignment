import styled from "styled-components";
import { COLOR_GRAY_LIGHT } from "../../utils";
import { useMemo } from "react";

export const pickRandomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const SkeletonItem = () => {
  const width = useMemo(() => pickRandomIntFromInterval(30, 60), []);

  return (
    <ListItem>
      <Title width={width} />
    </ListItem>
  );
};

export default SkeletonItem;

const ListItem = styled.li`
  width: 100%;
  padding: 15px 20px;
  border-bottom: 1px solid ${COLOR_GRAY_LIGHT};
`;

const Title = styled.div<{ width: number }>`
  height: 18px;
  width: ${({ width }) => `${width}%`};
  background-color: ${COLOR_GRAY_LIGHT};
  border-radius: 20px;
`;

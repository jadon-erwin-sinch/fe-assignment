import styled from "styled-components";
import { FONT_SMALL, TestIdProp } from "../../utils";
import ListItem from "./ListItem";
import SkeletonItem from "./SkeletonItem";
import { ApplicationOutput } from "../../api";
import { useApp } from "../../hooks";

interface ListProps extends TestIdProp {
  data?: ApplicationOutput[];
}

const LoadingState = () => (
  <Wrapper $lockHeight>
    {new Array(5).fill(null).map((_, i) => (
      <SkeletonItem key={i} />
    ))}
  </Wrapper>
);

const EmptyState = () => (
  <EmptyView>
    <span>Oops it looks a bit empty here.</span>
  </EmptyView>
);

const List = ({ data, testId }: ListProps) => {
  const { selectedApplication } = useApp();

  if (data === undefined) {
    return <LoadingState />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <Wrapper data-testid={testId}>
      {data.map((application, i) => (
        <ListItem
          id={application.id}
          key={application.id}
          index={i}
          name={application.name}
          description={application.description}
          testId={`${application.name}-${application.description}`}
          isActive={selectedApplication?.id === application.id}
        />
      ))}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.ul<{ $lockHeight?: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const EmptyView = styled.div`
  display: flex;
  min-height: 100px;
  padding: 20px;
  align-items: center;
  justify-content: center;

  span {
    font-size: ${FONT_SMALL};
  }
`;

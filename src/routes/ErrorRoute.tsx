import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

const ErrorRoute = () => {
  const error = useRouteError();

  useEffect(() => {
    console.warn(error);
  }, [error]);

  return (
    <Wrapper>
      <Heading>Something must have gone wrong, try reloading the page.</Heading>
      <Excerpt>We're really sorry about that.</Excerpt>
    </Wrapper>
  );
};

export default ErrorRoute;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h3`
  margin: 0;
`;

const Excerpt = styled.h3`
  margin: 0;
`;

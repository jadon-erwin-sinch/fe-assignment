import { ChangeEvent } from "react";
import styled from "styled-components";
import {
  FONT_SMALL,
  COLOR_GRAY_MEDIUM,
  COLOR_GRAY_DARK,
  Asset,
  TestIdProp,
} from "../utils";

interface SearchBarProps extends TestIdProp {
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchBar = ({ onQueryChange, value, testId }: SearchBarProps) => (
  <Wrapper>
    <InputContainer>
      <Input
        type="search"
        placeholder="Search applications"
        onChange={onQueryChange}
        value={value}
        data-testid={testId}
      />
    </InputContainer>
  </Wrapper>
);

export default SearchBar;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 0 auto;
  height: 40px;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: 13px;
    left: 15px;
    width: 15px;
    height: 15px;
    background-image: url(${Asset.Search});
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  padding-left: 40px;
  font-size: ${FONT_SMALL};
  color: ${COLOR_GRAY_DARK};
  outline: none;
  border: 1px solid ${COLOR_GRAY_MEDIUM};

  &:focus {
    padding-left: 40px;
  }
`;

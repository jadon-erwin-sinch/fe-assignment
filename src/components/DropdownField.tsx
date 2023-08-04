import { ChangeEvent } from "react";
import styled from "styled-components";
import {
  FONT_SMALL,
  COLOR_GRAY_DARK,
  COLOR_GRAY_MEDIUM,
  Asset,
  TestId,
  TestIdProp,
} from "../utils";
import IconButton, { IconButtonThemes } from "./IconButton";

export type OptionData = { id: string; name: string };

interface DropdownFieldProps extends TestIdProp {
  options?: OptionData[];
  id: string;
  label: string;
  value?: string;
  emptyText: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  addButtonTestId?: TestId;
  editButtonTestId?: TestId;
  deleteButtonTestId?: TestId;
}

const Options = ({
  options,
  emptyText,
}: {
  options?: OptionData[];
  emptyText: string;
}) => {
  if (!options?.length) {
    return <Option>{`-- ${emptyText} --`}</Option>;
  }

  return (
    <>
      {options.map((option) => (
        <Option key={option.id} id={option.id} value={option.id}>
          {option.name ? option.name : option.id}
        </Option>
      ))}
    </>
  );
};

const DropdownField = ({
  id,
  label,
  value,
  options,
  emptyText,
  onChange,
  onAdd,
  onEdit,
  onDelete,
  testId,
  addButtonTestId,
  editButtonTestId,
  deleteButtonTestId,
}: DropdownFieldProps) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Content>
        <Select id={id} onChange={onChange} value={value} data-testid={testId}>
          <Options options={options} emptyText={emptyText} />
        </Select>
        {onEdit && (
          <FieldAction>
            <IconButton
              iconUrl={Asset.Pencil}
              onClick={onEdit}
              testId={editButtonTestId}
            />
          </FieldAction>
        )}
        {onDelete && (
          <FieldAction>
            <IconButton
              iconUrl={Asset.Trash}
              theme={IconButtonThemes.Red}
              onClick={onDelete}
              testId={deleteButtonTestId}
            />
          </FieldAction>
        )}
        {onAdd && (
          <FieldAction>
            <IconButton
              iconUrl={Asset.Plus}
              theme={IconButtonThemes.Green}
              onClick={onAdd}
              testId={addButtonTestId}
            />
          </FieldAction>
        )}
      </Content>
    </Wrapper>
  );
};

export default DropdownField;

const Wrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const Content = styled.div`
  display: flex;
`;

const FieldAction = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${FONT_SMALL};
  color: ${COLOR_GRAY_DARK};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: ${FONT_SMALL};
  border-radius: 5px;
  border: 1px solid ${COLOR_GRAY_MEDIUM};
`;

const Option = styled.option``;

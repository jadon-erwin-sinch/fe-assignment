import { styled } from "styled-components";
import { Button } from "../../components";
import {
  COLOR_GRAY_DARK,
  COLOR_GRAY_MEDIUM,
  FONT_SMALL,
  TestId,
} from "../../utils";
import { useCallback, useMemo } from "react";
import { useApp, useConfigurationApi } from "../../hooks";

interface ConfigurationFieldFooterProps {
  configJson: object;
  duplicateAndEdit: () => void;
}

const ConfigurationFieldFooter = ({
  configJson,
  duplicateAndEdit,
}: ConfigurationFieldFooterProps) => {
  const {
    selectedConfiguration,
    selectedEnvironment,
    updateAllConfigurations,
    toggleSelectedConfiguration,
  } = useApp();
  const { activateConfigurationMethod, getConfigurationListMethod } =
    useConfigurationApi();
  const formattedJson = useMemo(
    () => JSON.stringify(configJson, undefined, 4),
    [configJson]
  );

  const activateConfiguration = useCallback(async () => {
    if (!selectedConfiguration || !selectedEnvironment) {
      return;
    }

    const updatedConfig = await activateConfigurationMethod(
      selectedConfiguration.id
    );

    if (!updatedConfig) {
      return;
    }

    const configurations = await getConfigurationListMethod({
      applicationId: selectedEnvironment.applicationId,
      enviromentId: selectedEnvironment.id,
    });

    if (configurations) {
      updateAllConfigurations(configurations);
      toggleSelectedConfiguration(updatedConfig);
    }
  }, [
    activateConfigurationMethod,
    getConfigurationListMethod,
    updateAllConfigurations,
    toggleSelectedConfiguration,
    selectedConfiguration,
    selectedEnvironment,
  ]);

  return (
    <>
      <Label>Configuration JSON View</Label>
      <JsonView
        value={formattedJson}
        readOnly
        data-testid={TestId.ConfigJsonInputReadonly}
      />
      <Footer>
        <ButtonContainer>
          <Button
            title="Activate"
            onClick={activateConfiguration}
            testId={TestId.ActivateConfigButton}
            disabled={selectedConfiguration?.active}
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button
            title="Duplicate and Edit"
            invertedTheme
            testId={TestId.DuplicateConfigButton}
            onClick={duplicateAndEdit}
          />
        </ButtonContainer>
      </Footer>
    </>
  );
};

export default ConfigurationFieldFooter;

const JsonView = styled.textarea`
  width: 100%;
  min-height: 250px;
  resize: vertical;
  border: 1px solid ${COLOR_GRAY_MEDIUM};
  border-radius: 5px;
  padding: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${FONT_SMALL};
  color: ${COLOR_GRAY_DARK};
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const ButtonContainer = styled.div`
  &:first-of-type {
    margin-right: 10px;
  }
`;

import { useCallback, ChangeEvent, useMemo } from "react";
import { DropdownField, OptionData } from "../../components";
import { useApp } from "../../hooks";
import { useNavigate } from "react-router-dom";
import ConfigurationFieldFooter from "./ConfigurationFieldFooter";
import { TestId } from "utils";

const ConfigurationField = () => {
  const {
    allConfigurations,
    selectedConfiguration,
    toggleSelectedConfiguration,
    currentConfigurationJson,
    selectedApplication,
    selectedEnvironment,
  } = useApp();
  const navigate = useNavigate();

  const onDropdownChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const currentOption = e.target.value;
      const currentConfiguration = allConfigurations?.find(
        (config) => config.id === currentOption
      );

      if (currentConfiguration) {
        toggleSelectedConfiguration(currentConfiguration);
      }
    },
    [allConfigurations, toggleSelectedConfiguration]
  );

  const onAddConfiguration = useCallback(
    (prepopulateData?: boolean) => {
      if (!selectedApplication) {
        return;
      }

      const navigationState = prepopulateData
        ? { state: { configJson: currentConfigurationJson } }
        : {};

      navigate(
        `/${selectedApplication.id}/environment/${selectedEnvironment?.id}/create-configuration`,
        navigationState
      );
    },
    [
      navigate,
      selectedApplication,
      selectedEnvironment,
      currentConfigurationJson,
    ]
  );

  const configurationOptions = useMemo<OptionData[]>(
    () =>
      allConfigurations?.map((config) => {
        const status = config.active ? "Active" : "Inactive";

        return {
          id: config.id,
          name: `${config.id} - ${status}`,
        };
      }) || [],
    [allConfigurations]
  );

  if (!selectedEnvironment) {
    return null;
  }

  return (
    <>
      <DropdownField
        options={configurationOptions}
        id="configuration"
        label="Configuration"
        emptyText="Create a configuration"
        onChange={onDropdownChange}
        onAdd={() => onAddConfiguration()}
        testId={TestId.ConfigDropdown}
        addButtonTestId={TestId.CreateConfigButton}
        value={selectedConfiguration?.id}
      />
      {currentConfigurationJson && (
        <ConfigurationFieldFooter
          configJson={currentConfigurationJson}
          duplicateAndEdit={() => onAddConfiguration(true)}
        />
      )}
    </>
  );
};

export default ConfigurationField;

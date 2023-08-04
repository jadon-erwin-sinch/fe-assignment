import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutCell, FormWrapper } from "../../components";
import {
  ConfigurationFormData,
  configurationDefaultFieldValidation,
  configurationValidationRules,
  mapPrepopulatedConfigurationData,
} from "./config";
import { useApp, useFormSubmission, useFormValidation } from "../../hooks";
import ConfigurationFormContent from "./ConfigurationFormContent";
import { toast } from "react-toastify";

const ConfigurationForm = () => {
  const {
    selectedApplication,
    selectedEnvironment,
    toggleSelectedConfiguration,
    updateCurrentConfigurationJson,
    updateAllConfigurations,
  } = useApp();
  const { submitNewConfigurationForm } = useFormSubmission();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultFieldValidation = useMemo(
    () => configurationDefaultFieldValidation(!!location?.state?.configJson),
    [location]
  );

  const defaultFormData = useMemo(
    () => mapPrepopulatedConfigurationData(location?.state?.configJson),
    [location]
  );

  const [formData, setFormData] =
    useState<ConfigurationFormData>(defaultFormData);

  const navigateBack = () => {
    toast.warning("I am not implemented yet")
  };

  const onFormSubmit = useCallback(async () => {
    if (!selectedApplication || !selectedEnvironment) {
      return;
    }

    const { allConfigurations, newConfiguration } =
      await submitNewConfigurationForm(
        formData,
        selectedApplication.id,
        selectedEnvironment.id
      );

    if (!allConfigurations || !newConfiguration) {
      return;
    }

    updateAllConfigurations(allConfigurations);
    toggleSelectedConfiguration(newConfiguration);
    updateCurrentConfigurationJson(newConfiguration.data);
    navigateBack();
    toast.success("Configuration successfully created")
  }, [
    formData,
    submitNewConfigurationForm,
    selectedApplication,
    selectedEnvironment,
    updateAllConfigurations,
    navigateBack,
    toggleSelectedConfiguration,
    updateCurrentConfigurationJson,
  ]);

  const {
    formHasValues,
    formIsDirty,
    validateField,
    validateForm,
    fieldValidation,
    formIsLoading,
  } = useFormValidation<ConfigurationFormData>({
    formData,
    validationRules: configurationValidationRules,
    defaultFieldValidation,
    onFormSubmit,
  });

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, id: keyof ConfigurationFormData) => {
      const value = e.target.value;

      validateField(id, value);
      setFormData({ ...formData, [id]: value });
    },
    [formData, validateField]
  );

  return (
    <LayoutCell
      heading="Create new configuration"
      onNavigateBack={navigateBack}
    >
      <FormWrapper
        hasValues={formHasValues}
        isLoading={formIsLoading}
        onSubmit={validateForm}
      >
        <ConfigurationFormContent
          formData={formData}
          onInputChange={(e) => onInputChange(e, "configJson")}
          fieldValidation={fieldValidation}
          formIsDirty={formIsDirty}
        />
      </FormWrapper>
    </LayoutCell>
  );
};

export default ConfigurationForm;

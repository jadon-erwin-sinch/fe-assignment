import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutCell, FormWrapper } from "../../components";
import {
  EnvironmentFieldValidation,
  EnvironmentFormData,
  PartialEnvironmentFormData,
  environmentDefaultFieldValidation,
  environmentValidationRules,
  mapPrepopulatedEnvironmentData,
  onFullEnvFormInputCallback,
} from "./config";
import {
  useApp,
  useEnvironmentApi,
  useFormSubmission,
  useFormValidation,
} from "../../hooks";
import EnvironmentFormContent from "./EnvironmentFormContent";
import { ConfigurationFormContent } from "../ConfigurationForm";
import { toast } from "react-toastify";

const EnvironmentForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const { submitNewEnvironmentForm, submitNewConfigurationForm } =
    useFormSubmission();
  const { editEnvironmentMethod, getEnvironmentListMethod } =
    useEnvironmentApi();
  const {
    selectedApplication,
    selectedEnvironment,
    toggleSelectedEnvironment,
    updateAllEnvironments,
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultFieldValidation = useMemo(
    () => environmentDefaultFieldValidation(!!isEditMode),
    [isEditMode]
  );
  const defaultFormData = useMemo(
    () => mapPrepopulatedEnvironmentData(location?.state),
    [location]
  );
  const [formData, setFormData] =
    useState<PartialEnvironmentFormData>(defaultFormData);

  const navigateBack = () => {
    toast.warning("I am not implemented yet")
  };

  const onPartialFormSubmit = useCallback(async () => {
    if (!selectedApplication || !selectedEnvironment) {
      return;
    }

    const updatedEnvironment = await editEnvironmentMethod({
      applicationId: selectedApplication.id,
      environmentId: selectedEnvironment.id,
      body: { name: formData.envName, region: formData.envRegion },
    });

    if (!updatedEnvironment) {
      return;
    }

    const environments = await getEnvironmentListMethod({
      applicationId: selectedApplication.id,
    });

    if (!environments) {
      return;
    }

    updateAllEnvironments(environments);
    navigateBack();
    toast.success("Environment updated successfully");
  }, [
    editEnvironmentMethod,
    getEnvironmentListMethod,
    updateAllEnvironments,
    navigateBack,
    formData,
    selectedApplication,
    selectedEnvironment,
  ]);

  const onFormSubmit = useCallback(async () => {
    if (!selectedApplication) {
      return;
    }

    const { allEnvironments, newEnvironment } = await submitNewEnvironmentForm(
      formData,
      selectedApplication.id
    );

    if (!allEnvironments || !newEnvironment) {
      return;
    }

    const { allConfigurations, newConfiguration } =
      await submitNewConfigurationForm(
        formData as EnvironmentFormData,
        selectedApplication.id,
        newEnvironment.id
      );

    if (!allConfigurations || !newConfiguration) {
      return;
    }

    updateAllEnvironments(allEnvironments);
    toggleSelectedEnvironment(newEnvironment);

    navigateBack();
    toast.success("Environment created successfully");
  }, [
    formData,
    selectedApplication,
    updateAllEnvironments,
    navigateBack,
    toggleSelectedEnvironment,
    submitNewEnvironmentForm,
    submitNewConfigurationForm,
  ]);

  const {
    formHasValues,
    formIsDirty,
    validateField,
    validateForm,
    fieldValidation,
    formIsLoading,
  } = useFormValidation<PartialEnvironmentFormData>({
    formData,
    validationRules: environmentValidationRules,
    defaultFieldValidation,
    onFormSubmit: isEditMode ? onPartialFormSubmit : onFormSubmit,
    isEditMode,
  });

  const onInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: keyof PartialEnvironmentFormData
    ) => {
      const value = e.target.value;

      validateField(id, value);
      setFormData({ ...formData, [id]: value });
    },
    [formData, validateField]
  );

  const formHeading = useMemo(
    () => (isEditMode ? "Edit environment" : "Create new environment"),
    [isEditMode]
  );

  return (
    <LayoutCell heading={formHeading} onNavigateBack={navigateBack}>
      <FormWrapper
        hasValues={formHasValues}
        isLoading={formIsLoading}
        onSubmit={validateForm}
      >
        <EnvironmentFormContent
          formData={formData}
          fieldValidation={fieldValidation}
          onInputChange={onInputChange}
          formIsDirty={formIsDirty}
        />
        {!isEditMode && (
          <ConfigurationFormContent
            formData={formData as EnvironmentFormData}
            fieldValidation={fieldValidation as EnvironmentFieldValidation}
            onInputChange={onInputChange as onFullEnvFormInputCallback}
            formIsDirty={formIsDirty}
          />
        )}
      </FormWrapper>
    </LayoutCell>
  );
};

export default EnvironmentForm;

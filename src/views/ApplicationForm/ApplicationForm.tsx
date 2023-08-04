import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutCell, FormWrapper } from "../../components";
import {
  ApplicationFieldValidation,
  ApplicationFormData,
  PartialApplicationFormData,
  applicationDefaultFieldValidation,
  applicationValidationRules,
  mapPrepopulatedApplicationData,
  onFullAppFormInputCallback,
} from "./config";
import {
  useFormValidation,
  useFormSubmission,
  useApp,
  useApplicationApi,
} from "../../hooks";
import { EnvironmentFormContent } from "../EnvironmentForm";
import { ConfigurationFormContent } from "../ConfigurationForm";
import ApplicationFormContent from "./ApplicationFormContent";
import { RouteNames } from "../../routes";
import { TestId } from "utils";
import { toast } from "react-toastify";

const ApplicationForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const { updateAllApplications, selectedApplication } = useApp();
  const { editApplicationMethod, getApplicationListMethod } =
    useApplicationApi();
  const {
    submitNewApplicationForm,
    submitNewEnvironmentForm,
    submitNewConfigurationForm,
  } = useFormSubmission();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultFieldValidation = useMemo(
    () => applicationDefaultFieldValidation(!!isEditMode),
    [isEditMode]
  );
  const defaultFormData = useMemo(
    () => mapPrepopulatedApplicationData(location?.state),
    [location]
  );
  const [formData, setFormData] =
    useState<PartialApplicationFormData>(defaultFormData);

  const navigateBack = () => {
    toast.warning("I am not implemented yet")
  };

  const onPartialFormSubmit = useCallback(async () => {
    if (!selectedApplication) {
      return;
    }

    const updatedApplication = await editApplicationMethod({
      applicationId: selectedApplication.id,
      body: { name: formData.appName, description: formData.appDescription },
    });

    if (!updatedApplication) {
      return;
    }

    const applications = await getApplicationListMethod();

    if (!applications) {
      return;
    }

    updateAllApplications(applications);
    navigateBack();
    toast.success("Application successfully updated")
  }, [
    editApplicationMethod,
    getApplicationListMethod,
    updateAllApplications,
    navigateBack,
    formData,
    selectedApplication,
  ]);

  const onFormSubmit = useCallback(async () => {
    const { allApplications, newApplication } = await submitNewApplicationForm(
      formData
    );

    if (!allApplications || !newApplication) {
      return;
    }

    const { allEnvironments, newEnvironment } = await submitNewEnvironmentForm(
      formData as ApplicationFormData,
      newApplication.id
    );

    if (!allEnvironments || !newEnvironment) {
      return;
    }

    const { allConfigurations, newConfiguration } =
      await submitNewConfigurationForm(
        formData as ApplicationFormData,
        newApplication.id,
        newEnvironment.id
      );

    if (!allConfigurations || !newConfiguration) {
      return;
    }

    updateAllApplications(allApplications);
    navigate(`/${newApplication.id}`);
    toast.success("Application successfully created")
  }, [
    formData,
    submitNewApplicationForm,
    submitNewEnvironmentForm,
    submitNewConfigurationForm,
    updateAllApplications,
    navigate,
  ]);

  const {
    formHasValues,
    formIsDirty,
    validateField,
    validateForm,
    fieldValidation,
    formIsLoading,
  } = useFormValidation<PartialApplicationFormData>({
    formData,
    validationRules: applicationValidationRules,
    defaultFieldValidation,
    onFormSubmit: isEditMode ? onPartialFormSubmit : onFormSubmit,
    isEditMode,
  });

  const onInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: keyof PartialApplicationFormData
    ) => {
      const value = e.target.value;

      validateField(id, value);
      setFormData({ ...formData, [id]: value });
    },
    [formData, validateField]
  );

  const formHeading = useMemo(
    () => (isEditMode ? "Edit application" : "Create new application"),
    [isEditMode]
  );

  return (
    <LayoutCell heading={formHeading} onNavigateBack={navigateBack}>
      <FormWrapper
        hasValues={formHasValues}
        isLoading={formIsLoading}
        onSubmit={validateForm}
        testId={TestId.AppForm}
      >
        <ApplicationFormContent
          formData={formData}
          fieldValidation={fieldValidation}
          onInputChange={onInputChange}
          formIsDirty={formIsDirty}
        />
        {!isEditMode && (
          <>
            <EnvironmentFormContent
              formData={formData as ApplicationFormData}
              fieldValidation={fieldValidation as ApplicationFieldValidation}
              onInputChange={onInputChange as onFullAppFormInputCallback}
              formIsDirty={formIsDirty}
            />
            <ConfigurationFormContent
              formData={formData as ApplicationFormData}
              fieldValidation={fieldValidation as ApplicationFieldValidation}
              onInputChange={onInputChange as onFullAppFormInputCallback}
              formIsDirty={formIsDirty}
            />
          </>
        )}
      </FormWrapper>
    </LayoutCell>
  );
};

export default ApplicationForm;

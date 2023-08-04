import { useCallback } from "react";
import { useApplicationApi } from "./useApplicationApi";
import { useEnvironmentApi } from "./useEnvironmentApi";
import { useConfigurationApi } from "./useConfigurationApi";
import {
  ApplicationOutput,
  ConfigurationEnrichedOutput,
  ConfigurationOutput,
  EnvironmentOutput,
} from "../api";
import { PartialApplicationFormData } from "../views/ApplicationForm";
import { PartialEnvironmentFormData } from "../views/EnvironmentForm";
import { ConfigurationFormData } from "../views/ConfigurationForm";

interface FormSubmissionHook {
  /**
   * Submit a form for creating a new application.
   */
  submitNewApplicationForm: (formData: PartialApplicationFormData) => Promise<{
    newApplication: void | ApplicationOutput;
    allApplications: void | ApplicationOutput[];
  }>;
  /**
   * Submit a form for creating a new environment.
   */
  submitNewEnvironmentForm: (
    formData: PartialEnvironmentFormData,
    applicationId: string
  ) => Promise<{
    newEnvironment: void | EnvironmentOutput;
    allEnvironments: void | EnvironmentOutput[];
  }>;
  /**
   * Submit a form for creating a new configuration.
   */
  submitNewConfigurationForm: (
    formData: ConfigurationFormData,
    applicationId: string,
    environmentId: string
  ) => Promise<{
    newConfiguration: void | ConfigurationEnrichedOutput;
    allConfigurations: void | ConfigurationOutput[];
  }>;
}

/**
 * Custom hook for handling form submission actions.
 * @see {@link FormSubmissionHook}
 */
export const useFormSubmission = (): FormSubmissionHook => {
  const { createNewApplicationMethod, getApplicationListMethod } =
    useApplicationApi();
  const { createNewEnvironmentMethod, getEnvironmentListMethod } =
    useEnvironmentApi();
  const { createNewConfigurationMethod, getConfigurationListMethod } =
    useConfigurationApi();

  const submitNewApplicationForm = useCallback(
    (formData: PartialApplicationFormData) =>
      createNewApplicationMethod({
        body: { name: formData.appName, description: formData.appDescription },
      }).then((newApplication) =>
        getApplicationListMethod().then((allApplications) => ({
          newApplication,
          allApplications,
        }))
      ),
    [createNewApplicationMethod, getApplicationListMethod]
  );

  const submitNewEnvironmentForm = useCallback(
    (formData: PartialEnvironmentFormData, applicationId: string) =>
      createNewEnvironmentMethod({
        applicationId,
        body: { name: formData.envName, region: formData.envRegion },
      }).then((newEnvironment) =>
        getEnvironmentListMethod({
          applicationId,
        }).then((allEnvironments) => ({ newEnvironment, allEnvironments }))
      ),
    [createNewEnvironmentMethod, getEnvironmentListMethod]
  );

  const submitNewConfigurationForm = useCallback(
    (
      formData: ConfigurationFormData,
      applicationId: string,
      environmentId: string
    ) =>
      createNewConfigurationMethod({
        applicationId,
        enviromentId: environmentId,
        data: JSON.parse(formData.configJson),
      }).then((newConfiguration) =>
        getConfigurationListMethod({
          applicationId,
          enviromentId: environmentId,
        }).then((allConfigurations) => ({
          newConfiguration,
          allConfigurations,
        }))
      ),
    [createNewConfigurationMethod, getConfigurationListMethod]
  );

  return {
    submitNewApplicationForm,
    submitNewEnvironmentForm,
    submitNewConfigurationForm,
  };
};

import { useCallback, useEffect } from "react";
import { useApp } from "./useApp";
import { useEnvironmentApi } from "./useEnvironmentApi";
import { useConfigurationApi } from "./useConfigurationApi";

/**
 * Custom hook for keeping all data points in sync.
 * Different callbacks get triggered whenever a selected data entity is toggled.
 */
export const useDataUpdater = () => {
  const {
    selectedApplication,
    selectedEnvironment,
    selectedConfiguration,
    toggleSelectedEnvironment,
    toggleSelectedConfiguration,
    updateAllEnvironments,
    updateAllConfigurations,
    updateCurrentConfigurationJson,
  } = useApp();
  const { getEnvironmentListMethod } = useEnvironmentApi();
  const { getConfigurationListMethod, getConfigurationDetailsMethod } =
    useConfigurationApi();

  const updateEnvironmentListData = useCallback(async () => {
    function resetEnvironments() {
      updateAllEnvironments([]);
      toggleSelectedEnvironment();
    }
    if (!selectedApplication) {
      resetEnvironments();
      return;
    }

    const environments = await getEnvironmentListMethod({
      applicationId: selectedApplication.id,
    });

    if (!environments || !environments.length) {
      resetEnvironments();
    } else {
      updateAllEnvironments(environments);
      toggleSelectedEnvironment(environments[0]);
    }
  }, [
    selectedApplication,
    updateAllEnvironments,
    getEnvironmentListMethod,
    toggleSelectedEnvironment,
  ]);

  const updateConfigurationListData = useCallback(async () => {
    function resetConfigurations() {
      updateAllConfigurations([]);
      toggleSelectedConfiguration();
    }

    if (!selectedEnvironment) {
      resetConfigurations();
      return;
    }

    const configurations = await getConfigurationListMethod({
      applicationId: selectedEnvironment.applicationId,
      enviromentId: selectedEnvironment.id,
    });

    if (!configurations || !configurations.length) {
      resetConfigurations();
    } else {
      updateAllConfigurations(configurations);

      const activeConfig = configurations.find((config) => config.active);
      toggleSelectedConfiguration(
        activeConfig ? activeConfig : configurations[0]
      );
    }
  }, [
    selectedEnvironment,
    toggleSelectedConfiguration,
    getConfigurationListMethod,
    updateAllConfigurations,
  ]);

  const updateConfigurationListJsonData = useCallback(async () => {
    if (!selectedConfiguration) {
      updateCurrentConfigurationJson();
      return;
    }

    const configDetails = await getConfigurationDetailsMethod(
      selectedConfiguration.id
    );

    if (!configDetails) {
      updateCurrentConfigurationJson();
    } else {
      updateCurrentConfigurationJson(configDetails.data);
    }
  }, [
    selectedConfiguration,
    getConfigurationDetailsMethod,
    updateCurrentConfigurationJson,
  ]);

  useEffect(() => {
    updateEnvironmentListData();
  }, [updateEnvironmentListData]);

  useEffect(() => {
    updateConfigurationListData();
  }, [updateConfigurationListData]);

  useEffect(() => {
    updateConfigurationListJsonData();
  }, [updateConfigurationListJsonData]);
};

import { ReactNode, createContext, useCallback, useContext } from "react";
import {
  ActivateConfiguration,
  ConfigurationEnrichedOutput,
  ConfigurationOutput,
  CreateNewConfiguration,
  FetchAllConfigurations,
  FetchConfigurationById,
  configurationsApi,
} from "../api";
import { useApp } from "./useApp";
import { AxiosError } from "axios";

export interface ConfigurationApiHook {
  /**
   * Method for fetching all configurations by application and environment id.
   */
  getConfigurationListMethod: FetchAllConfigurations<
    Promise<ConfigurationOutput[] | void>
  >;
  /**
   * Method for creating a new configuration on an environment by id.
   */
  createNewConfigurationMethod: CreateNewConfiguration<
    Promise<ConfigurationEnrichedOutput | void>
  >;
  /**
   * Method for fetching single configuration by application and environment id.
   */
  getConfigurationDetailsMethod: FetchConfigurationById<
    Promise<ConfigurationEnrichedOutput | void>
  >;
  /**
   * Method for activating configuration by id.
   */
  activateConfigurationMethod: ActivateConfiguration<
    Promise<ConfigurationOutput | void>
  >;
}

const ConfigurationApiContext = createContext<ConfigurationApiHook>(
  {} as ConfigurationApiHook
);

/**
 * Custom context provider for handling the configuration api.
 * @see {@link ConfigurationApiHook}
 */
export const ConfigurationApiProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { reportApiError } = useApp();

  const getConfigurationListMethod = useCallback<
    FetchAllConfigurations<Promise<ConfigurationOutput[] | void>>
  >(
    (params) =>
      configurationsApi()
        .fetchAllConfigurations(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const createNewConfigurationMethod = useCallback<
    CreateNewConfiguration<Promise<ConfigurationEnrichedOutput | void>>
  >(
    (params) =>
      configurationsApi()
        .createNewConfiguration(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const getConfigurationDetailsMethod = useCallback<
    FetchConfigurationById<Promise<ConfigurationEnrichedOutput | void>>
  >(
    (configurationId: string) =>
      configurationsApi()
        .fetchConfigurationById(configurationId)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const activateConfigurationMethod = useCallback<
    ActivateConfiguration<Promise<ConfigurationOutput | void>>
  >(
    (configurationId: string) =>
      configurationsApi()
        .activateConfigurationById(configurationId)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  return (
    <ConfigurationApiContext.Provider
      value={{
        getConfigurationListMethod,
        createNewConfigurationMethod,
        getConfigurationDetailsMethod,
        activateConfigurationMethod,
      }}
    >
      {children}
    </ConfigurationApiContext.Provider>
  );
};

/**
 * Custom hook for handling the application api.
 * @see {@link ConfigurationApiHook}
 */
export const useConfigurationApi = () => useContext(ConfigurationApiContext);

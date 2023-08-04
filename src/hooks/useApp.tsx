import {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { AxiosError } from "axios";
import {
  ApplicationOutput,
  ConfigurationOutput,
  EnvironmentOutput,
} from "../api";
import { ApplicationApiProvider } from "./useApplicationApi";
import { EnvironmentApiProvider } from "./useEnvironmentApi";
import { ConfigurationApiProvider } from "./useConfigurationApi";

export interface AppHook {
  /**
   * An array of all applications.
   */
  allApplications?: ApplicationOutput[];
  /**
   * Update all applications.
   */
  updateAllApplications: (applications: ApplicationOutput[]) => void;
  /**
   * The currently selected application.
   */
  selectedApplication?: ApplicationOutput;
  /**
   * Toggle currently selected application.
   */
  toggleSelectedApplication: (application: ApplicationOutput) => void;

  /**
   * An array of all environments.
   */
  allEnvironments?: EnvironmentOutput[];
  /**
   * Update all environments.
   */
  updateAllEnvironments: (environments: EnvironmentOutput[]) => void;
  /**
   * The currently selected environment.
   */
  selectedEnvironment?: EnvironmentOutput;
  /**
   * Toggle currently selected environment.
   */
  toggleSelectedEnvironment: (environment?: EnvironmentOutput) => void;

  /**
   * An array of all configurations.
   */
  allConfigurations?: ConfigurationOutput[];
  /**
   * Update all configurations.
   */
  updateAllConfigurations: (configurations: ConfigurationOutput[]) => void;
  /**
   * The currently selected configuration.
   */
  selectedConfiguration?: ConfigurationOutput;
  /**
   * Toggle currently selected configuration.
   */
  toggleSelectedConfiguration: (configuration?: ConfigurationOutput) => void;
  /**
   * The currently selected configuration's json data.
   */
  currentConfigurationJson?: object;
  /**
   * Update currently selected configuration's json data.
   */
  updateCurrentConfigurationJson: (json?: object) => void;

  /**
   * Report if there's a current error.
   */
  reportApiError: (error: AxiosError) => void;
  /**
   * Indicator if api call has an error.
   */
  apiError?: AxiosError;
}

const AppContext = createContext<AppHook>({} as AppHook);

/**
 * Custom context provider for handling application data.
 * @see {@link AppHook}
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [apiError, setApiError] = useState<AxiosError>();

  const [allApplications, setAllApplications] = useState<ApplicationOutput[]>();
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationOutput>();

  const [allEnvironments, setAllEnvironments] = useState<EnvironmentOutput[]>();
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentOutput>();

  const [allConfigurations, setAllConfigurations] =
    useState<ConfigurationOutput[]>();
  const [selectedConfiguration, setSelectedConfiguration] =
    useState<ConfigurationOutput>();
  const [currentConfigurationJson, setCurrentConfigurationJson] =
    useState<object>();

  const updateAllApplications = useCallback(
    (applications: ApplicationOutput[]) => {
      setAllApplications(applications);
    },
    []
  );

  const toggleSelectedApplication = useCallback(
    (application: ApplicationOutput) => {
      setSelectedApplication(application);
    },
    []
  );

  const updateAllEnvironments = useCallback(
    (environments: EnvironmentOutput[]) => {
      setAllEnvironments(environments);
    },
    []
  );

  const toggleSelectedEnvironment = useCallback(
    (environment?: EnvironmentOutput) => {
      setSelectedEnvironment(environment);
    },
    []
  );

  const updateAllConfigurations = useCallback(
    (configurations: ConfigurationOutput[]) => {
      setAllConfigurations(configurations);
    },
    []
  );

  const toggleSelectedConfiguration = useCallback(
    (configuration?: ConfigurationOutput) => {
      setSelectedConfiguration(configuration);
    },
    []
  );

  const updateCurrentConfigurationJson = useCallback((json?: object) => {
    setCurrentConfigurationJson(json);
  }, []);

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        setApiError(undefined);
      }, 5000);
    }
  }, [apiError]);

  const reportApiError = useCallback((error: AxiosError) => {
    console.error(error);
    setApiError(error);
  }, []);

  return (
    <AppContext.Provider
      value={{
        allApplications,
        updateAllApplications,
        selectedApplication,
        toggleSelectedApplication,

        allEnvironments,
        updateAllEnvironments,
        selectedEnvironment,
        toggleSelectedEnvironment,

        allConfigurations,
        updateAllConfigurations,
        selectedConfiguration,
        toggleSelectedConfiguration,
        currentConfigurationJson,
        updateCurrentConfigurationJson,

        reportApiError,
        apiError,
      }}
    >
      <ApplicationApiProvider>
        <EnvironmentApiProvider>
          <ConfigurationApiProvider>{children}</ConfigurationApiProvider>
        </EnvironmentApiProvider>
      </ApplicationApiProvider>
    </AppContext.Provider>
  );
};

/**
 * Custom hook for handling app functionality.
 * @see {@link AppHook}
 */
export const useApp = () => useContext(AppContext);

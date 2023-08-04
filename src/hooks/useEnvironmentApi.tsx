import { ReactNode, createContext, useCallback, useContext } from "react";
import {
  CreateNewEnvironment,
  DeleteEnvironment,
  EditEnvironment,
  EnvironmentOutput,
  FetchAllEnvironments,
  environmentsApi,
} from "../api";
import { useApp } from "./useApp";
import { AxiosError } from "axios";

export interface EnvironmentApiHook {
  /**
   * Method for fetching all environments by application id.
   */
  getEnvironmentListMethod: FetchAllEnvironments<
    Promise<EnvironmentOutput[] | void>
  >;
  /**
   * Method for creating a new environment for a certain application.
   */
  createNewEnvironmentMethod: CreateNewEnvironment<
    Promise<EnvironmentOutput | void>
  >;
  /**
   * Method for editing an environment for a certain application.
   */
  editEnvironmentMethod: EditEnvironment<Promise<EnvironmentOutput | void>>;
  /**
   * Method for deleting an environment.
   */
  deleteEnvironmentMethod: DeleteEnvironment<Promise<void>>;
}

const EnvironmentApiContext = createContext<EnvironmentApiHook>(
  {} as EnvironmentApiHook
);

/**
 * Custom context provider for handling the environment api.
 * @see {@link EnvironmentApiHook}
 */
export const EnvironmentApiProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { reportApiError } = useApp();

  const getEnvironmentListMethod = useCallback<
    FetchAllEnvironments<Promise<EnvironmentOutput[] | void>>
  >(
    (params) =>
      environmentsApi()
        .fetchEnvironmentsByAppId(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const createNewEnvironmentMethod = useCallback<
    CreateNewEnvironment<Promise<EnvironmentOutput | void>>
  >(
    (params) =>
      environmentsApi()
        .createNewEnvironmentByAppId(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const editEnvironmentMethod = useCallback<
    EditEnvironment<Promise<EnvironmentOutput | void>>
  >(
    (params) =>
      environmentsApi()
        .editEnvironmentByAppId(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const deleteEnvironmentMethod = useCallback<DeleteEnvironment<Promise<void>>>(
    (params) =>
      environmentsApi()
        .deleteEnvironmentByAppId(params)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  return (
    <EnvironmentApiContext.Provider
      value={{
        getEnvironmentListMethod,
        createNewEnvironmentMethod,
        editEnvironmentMethod,
        deleteEnvironmentMethod,
      }}
    >
      {children}
    </EnvironmentApiContext.Provider>
  );
};

/**
 * Custom hook for handling the environment api.
 * @see {@link EnvironmentApiHook}
 */
export const useEnvironmentApi = () => useContext(EnvironmentApiContext);

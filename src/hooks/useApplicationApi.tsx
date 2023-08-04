import { ReactNode, createContext, useCallback, useContext } from "react";
import {
  ApplicationOutput,
  CreateNewApplication,
  DeleteApplication,
  EditApplication,
  FetchAllApplications,
  applicationsApi,
} from "../api";
import { useApp } from "./useApp";
import { AxiosError } from "axios";

export interface ApplicationApiHook {
  /**
   * Method for updating application list.
   */
  getApplicationListMethod: FetchAllApplications<
    Promise<ApplicationOutput[] | void>
  >;
  /**
   * Method for creating a new application.
   */
  createNewApplicationMethod: CreateNewApplication<
    Promise<ApplicationOutput | void>
  >;
  /**
   * Method for edit existing application.
   */
  editApplicationMethod: EditApplication<Promise<ApplicationOutput | void>>;
  /**
   * Method for deleting an environment.
   */
  deleteApplicationMethod: DeleteApplication;
}

const ApplicationApiContext = createContext<ApplicationApiHook>(
  {} as ApplicationApiHook
);

/**
 * Custom context provider for handling the application api.
 * @see {@link ApplicationApiHook}
 */
export const ApplicationApiProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { reportApiError } = useApp();

  const getApplicationListMethod = useCallback<
    FetchAllApplications<Promise<ApplicationOutput[] | void>>
  >(
    (params) =>
      applicationsApi()
        .fetchAllApplications(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const createNewApplicationMethod = useCallback<
    CreateNewApplication<Promise<ApplicationOutput | void>>
  >(
    (params) =>
      applicationsApi()
        .createNewApplication(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const editApplicationMethod = useCallback<
    EditApplication<Promise<ApplicationOutput | void>>
  >(
    (params) =>
      applicationsApi()
        .editApplication(params)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          reportApiError(error);
        }),
    [reportApiError]
  );

  const deleteApplicationMethod = useCallback<DeleteApplication>(
    (params) =>
      applicationsApi()
        .deleteApplication(params),
    [reportApiError]
  );

  return (
    <ApplicationApiContext.Provider
      value={{
        getApplicationListMethod,
        createNewApplicationMethod,
        editApplicationMethod,
        deleteApplicationMethod,
      }}
    >
      {children}
    </ApplicationApiContext.Provider>
  );
};

/**
 * Custom hook for handling the application api.
 * @see {@link ApplicationApiHook}
 */
export const useApplicationApi = () => useContext(ApplicationApiContext);

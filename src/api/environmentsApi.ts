import axios from "axios";
import { ApiPagination, BASE_URL, headers } from "./apiUtils";

export interface EnvironmentInput {
  name: string;
  region: string;
}

export interface EnvironmentOutput extends EnvironmentInput {
  id: string;
  applicationId: string;
}

export interface EnvironmentSingleResponse {
  data: EnvironmentOutput;
}

export interface EnvironmentListResponse {
  data: EnvironmentOutput[];
  totalCount: number;
}

export type FetchAllEnvironments<T> = ({
  applicationId,
  searchTerm,
  take,
  skip,
}: {
  applicationId: string;
  searchTerm?: string;
} & ApiPagination) => T;

export type CreateNewEnvironment<T, P = {}> = ({
  applicationId,
  body,
}: {
  applicationId: string;
  body: EnvironmentInput;
} & P) => T;

export type EditEnvironment<T, P = {}> = ({
  applicationId,
  environmentId,
  body,
}: {
  applicationId: string;
  environmentId: string;
  body: EnvironmentInput;
} & P) => T;

export type DeleteEnvironment<T, P = {}> = ({
  applicationId,
  environmentId,
}: {
  applicationId: string;
  environmentId: string;
} & P) => T;

interface EnvironmentsApi {
  fetchEnvironmentsByAppId: FetchAllEnvironments<
    Promise<EnvironmentListResponse>
  >;
  createNewEnvironmentByAppId: CreateNewEnvironment<
    Promise<EnvironmentSingleResponse>
  >;
  editEnvironmentByAppId: EditEnvironment<Promise<EnvironmentSingleResponse>>;
  deleteEnvironmentByAppId: DeleteEnvironment<Promise<void>>;
}

export const environmentsApi = (): EnvironmentsApi => {
  return {
    fetchEnvironmentsByAppId: ({ applicationId, ...params }) =>
      axios
        .get(`${BASE_URL}/applications/${applicationId}/environments`, {
          headers,
          params,
        })
        .then(({ data }) => data),
    createNewEnvironmentByAppId: ({ applicationId, body }) =>
      axios
        .post(`${BASE_URL}/applications/${applicationId}/environments`, body, {
          headers,
        })
        .then(({ data }) => data),
    editEnvironmentByAppId: ({ applicationId, environmentId, body }) =>
      axios
        .put(
          `${BASE_URL}/applications/${applicationId}/environments/${environmentId}`,
          body,
          {
            headers,
          }
        )
        .then(({ data }) => data),
    deleteEnvironmentByAppId: ({ applicationId, environmentId }) =>
      axios
        .delete(
          `${BASE_URL}/applications/${applicationId}/environments/${environmentId}`,
          {
            headers,
          }
        )
        .then(({ data }) => data),
  };
};

import axios from "axios";
import { ApiPagination, BASE_URL, headers } from "./apiUtils";

export interface ConfigurationInput {
  applicationId: string;
  enviromentId: string;
  data: object;
}

export interface ConfigurationOutput {
  id: string;
  environmentId: string;
  active: boolean;
}

export interface ConfigurationEnrichedOutput extends ConfigurationOutput {
  data: object;
}

export interface ConfigurationSingleResponse {
  data: ConfigurationEnrichedOutput;
}

export interface ConfigurationListResponse {
  data: ConfigurationOutput[];
  totalCount: number;
}

export type FetchAllConfigurations<T> = ({
  applicationId,
  enviromentId,
  take,
  skip,
}: {
  applicationId: string;
  enviromentId: string;
} & ApiPagination) => T;

export type CreateNewConfiguration<T> = (body: ConfigurationInput) => T;

export type FetchConfigurationById<T> = (configurationId: string) => T;

export type ActivateConfiguration<T> = (configurationId: string) => T;

interface ConfigurationsApi {
  fetchAllConfigurations: FetchAllConfigurations<
    Promise<ConfigurationListResponse>
  >;
  createNewConfiguration: CreateNewConfiguration<
    Promise<ConfigurationSingleResponse>
  >;
  fetchConfigurationById: FetchConfigurationById<
    Promise<ConfigurationSingleResponse>
  >;
  activateConfigurationById: ActivateConfiguration<
    Promise<{ data: ConfigurationOutput }>
  >;
}

export const configurationsApi = (): ConfigurationsApi => {
  return {
    fetchAllConfigurations: (params) =>
      axios
        .get(`${BASE_URL}/configurations`, {
          headers,
          params,
        })
        .then(({ data }) => data),
    createNewConfiguration: (body) =>
      axios
        .post(`${BASE_URL}/configurations`, body, {
          headers,
        })
        .then(({ data }) => data),
    fetchConfigurationById: (configurationId) =>
      axios
        .get(`${BASE_URL}/configurations/${configurationId}`, {
          headers,
        })
        .then(({ data }) => data),
    activateConfigurationById: (configurationId) =>
      axios
        .post(
          `${BASE_URL}/configurations/${configurationId}/active`,
          {},
          {
            headers,
          }
        )
        .then(({ data }) => data),
  };
};

import axios from "axios";
import { ApiPagination, BASE_URL, headers } from "./apiUtils";

export interface ApplicationInput {
  name: string;
  description: string;
}

export interface ApplicationOutput extends ApplicationInput {
  id: string;
}

export interface ApplicationSingleResponse {
  data: ApplicationOutput;
}

export interface ApplicationListResponse {
  data: ApplicationOutput[];
  totalCount: number;
}

export type FetchAllApplications<T> = ({
  searchTerm,
  take,
  skip,
}?: {
  searchTerm?: string;
} & ApiPagination) => T;

export type CreateNewApplication<T> = ({
  body,
}: {
  body: ApplicationInput;
}) => T;

export type EditApplication<T> = ({
  applicationId,
  body,
}: {
  applicationId: string;
  body: ApplicationInput;
}) => T;

export type DeleteApplication = ({
  applicationId,
}: {
  applicationId: string;
}) => Promise<void>;

export interface ApplicationsApi {
  fetchAllApplications: FetchAllApplications<Promise<ApplicationListResponse>>;
  createNewApplication: CreateNewApplication<
    Promise<ApplicationSingleResponse>
  >;
  editApplication: EditApplication<Promise<ApplicationSingleResponse>>;
  deleteApplication: DeleteApplication;
}

export const applicationsApi = (): ApplicationsApi => {
  return {
    fetchAllApplications: (params) =>
      axios
        .get(`${BASE_URL}/applications`, {
          headers,
          params,
        })
        .then(({ data }) => data),
    createNewApplication: ({ body }) =>
      axios
        .post(`${BASE_URL}/applications`, body, {
          headers,
        })
        .then(({ data }) => data),
    editApplication: ({ applicationId, body }) =>
      axios
        .put(`${BASE_URL}/applications/${applicationId}`, body, {
          headers,
        })
        .then(({ data }) => data),
    deleteApplication: () =>
      
      axios.delete(`${BASE_URL}/applications`, {
        headers,
      })
      .then(({ data }) => data)

  };
};

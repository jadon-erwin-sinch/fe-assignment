const BASE_URL_DEV = "https://config-mgmt-dev.fly.dev/api/v1";
const BASE_URL_PROD = "https://config-mgmt.fly.dev/api/v1";
export const BASE_URL = BASE_URL_DEV;

export const headers = {
  "Content-Type": "application/json",
};

export interface ApiPagination {
  take?: number;
  skip?: number;
}

export const errorMessage =
  "Something went wrong on our side, sorry for that. Please try again.";

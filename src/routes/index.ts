export { default as HomeRoute } from "./HomeRoute";
export { default as ErrorRoute } from "./ErrorRoute";

export enum RouteNames {
  Base = "/",
  AppDetails = "/:appId",
  CreateApp = "/create-application",
  EditApp = "/:appId/edit-application",
  CreateEnv = "/:appId/create-environment",
  EditEnv = "/:appId/edit-environment/:envId",
  CreateConfig = "/:appId/environment/:envId/create-configuration",
  NoResults = "/no-results-found",
  All = "*",
}

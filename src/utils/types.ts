export enum Asset {
  Search = "/assets/search.png",
  Plus = "/assets/plus.png",
  Trash = "/assets/trash.png",
  Pencil = "/assets/pencil.png",
  ArrowLeft = "/assets/arrow-left.png",
}

export enum TestId {
  AppList = "app-list",
  AppSettings = "app-settings",
  CreateAppButton = "create-app-button",
  EditAppButton = "edit-app-button",
  DeleteAppButton = "delete-app-button",
  CreateEnvButton = "create-env-button",
  EditEnvButton = "edit-env-button",
  DeleteEnvButton = "delete-env-button",
  CreateConfigButton = "create-config-button",
  ActivateConfigButton = "activate-config-button",
  DuplicateConfigButton = "duplicate-config-button",
  FormSubmitButton = "form-submit-button",
  AppNameInput = "app-name-input",
  AppDescInput = "app-desc-input",
  EnvNameInput = "env-name-input",
  EnvRegionInput = "env-region-input",
  ConfigJsonInput = "config-json-input",
  ConfigJsonInputReadonly = "config-json-input-readonly",
  EnvDropdown = "env-dropdown",
  ConfigDropdown = "config-dropdown",
  AppNameError = "app-name-error",
  AppDescError = "app-desc-error",
  EnvNameError = "env-name-error",
  EnvRegionError = "env-region-error",
  ConfigJsonError = "config-json-error",
  AppForm = "app-form",
  SearchBar = "search-bar",
  NoResultsFound = "no-results-found",
}

export type TestIdProp = {
  testId?: TestId;
};

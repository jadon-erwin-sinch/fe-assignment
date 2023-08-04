import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "./styles";
import { ErrorRoute, RouteNames } from "./routes";
import {
  SettingsPanel,
  ApplicationForm,
  EnvironmentForm,
  ConfigurationForm,
  NoResultsFound,
  CouldNotBeFound,
  SkeletonPanel,
} from "./views";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: RouteNames.Base,
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: RouteNames.CreateApp,
        element: <ApplicationForm />,
      },
      {
        path: RouteNames.AppDetails,
        element: <SettingsPanel />,
      },
      {
        path: RouteNames.EditApp,
        element: <ApplicationForm isEditMode />,
      },
      {
        path: RouteNames.CreateEnv,
        element: <EnvironmentForm />,
      },
      {
        path: RouteNames.EditEnv,
        element: <EnvironmentForm isEditMode />,
      },
      {
        path: RouteNames.CreateConfig,
        element: <ConfigurationForm />,
      },
      {
        path: RouteNames.NoResults,
        element: <NoResultsFound />,
      },
      {
        path: RouteNames.Base,
        element: <SkeletonPanel />,
      },
      {
        path: RouteNames.All,
        element: <CouldNotBeFound />,
      },
    ],
  },
]);

root.render(
  <>
    <StrictMode>
      <GlobalStyles />
      <RouterProvider router={router} />
    </StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

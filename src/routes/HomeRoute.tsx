import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  useApp,
  useApplicationApi,
  useDataUpdater,
  usePathRedirect,
} from "../hooks";
import { errorMessage } from "../api";
import { Layout, Banner } from "../components";
import { ApplicationList, EmptyView } from "../views";
import { COLOR_RED, COLOR_WHITE } from "../utils";
import { RouteNames } from "routes";

const HomeRoute = () => {
  const { apiError, updateAllApplications, allApplications } = useApp();
  const { getApplicationListMethod } = useApplicationApi();
  usePathRedirect();
  useDataUpdater();
  const location = useLocation();
  const showEmptyView = useMemo(
    () =>
      allApplications &&
      !allApplications.length &&
      location.pathname !== RouteNames.CreateApp &&
      location.pathname !== RouteNames.NoResults,
    [allApplications, location]
  );

  useEffect(() => {
    getApplicationListMethod().then((applications) => {
      if (applications) {
        updateAllApplications(applications);
      }
    });
  }, [getApplicationListMethod, updateAllApplications]);

  return (
    <>
      <Layout>
        <ApplicationList />
        {showEmptyView ? <EmptyView /> : <Outlet />}
      </Layout>
      {apiError && (
        <Banner backgroundColor={COLOR_RED} textColor={COLOR_WHITE}>
          {errorMessage}
        </Banner>
      )}
    </>
  );
};

export default HomeRoute;

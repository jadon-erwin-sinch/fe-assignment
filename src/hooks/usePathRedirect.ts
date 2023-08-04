import { useEffect, useRef } from "react";
import { useApp } from "./useApp";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Custom hook for tracing pathnames and redirecting the app
 * to the correct url, in both matching and missing cases.
 */
export const usePathRedirect = () => {
  const { allApplications, toggleSelectedApplication } = useApp();
  const navigate = useNavigate();
  const { appId } = useParams();
  const initialRedirectDone = useRef(false);

  useEffect(() => {
    if (!allApplications?.length) {
      return;
    }

    const paramMatch = allApplications.find((app) => app.id === appId);

    if (paramMatch) {
      toggleSelectedApplication(paramMatch);
    } else if (!initialRedirectDone.current) {
      navigate(`${allApplications[0].id}`);
    }

    initialRedirectDone.current = true;
  }, [toggleSelectedApplication, appId, navigate, allApplications]);
};

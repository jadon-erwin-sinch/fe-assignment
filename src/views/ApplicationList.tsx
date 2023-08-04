import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, LayoutCell, List, SearchBar } from "../components";
import { useApp, useApplicationApi } from "../hooks";
import { styled } from "styled-components";
import { RouteNames } from "../routes";
import { TestId } from "utils";

const ApplicationList = () => {
  const { allApplications, updateAllApplications, selectedApplication } =
    useApp();
  const { getApplicationListMethod } = useApplicationApi();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const showAddButton = useMemo(
    () =>
      !searchQuery.length &&
      !location.pathname.includes("edit-application") &&
      !location.pathname.includes(RouteNames.CreateApp),
    [location, searchQuery]
  );

  const onSearchQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      getApplicationListMethod({ searchTerm: value }).then((applications) => {
        if (!applications) {
          return;
        }

        updateAllApplications(applications);

        const currentlySelectedApplication = applications.find(
          (app) => app.id === selectedApplication?.id
        );

        if (!!currentlySelectedApplication) {
          navigate(`/${currentlySelectedApplication.id}`);
          return;
        }

        if (applications.length) {
          navigate(`/${applications[0].id}`);
        } else {
          navigate(RouteNames.NoResults);
        }
      });
    },
    [
      getApplicationListMethod,
      updateAllApplications,
      selectedApplication,
      navigate,
    ]
  );

  const navigateToAppCreation = useCallback(() => {
    navigate(RouteNames.CreateApp);
  }, [navigate]);

  return (
    <LayoutCell
      heading="Applications"
      lockHeight
      headerContent={
        showAddButton && (
          <Button
            onClick={navigateToAppCreation}
            title="Add new app"
            narrow
            testId={TestId.CreateAppButton}
          />
        )
      }
    >
      <Header>
        <SearchBar
          onQueryChange={onSearchQueryChange}
          value={searchQuery}
          testId={TestId.SearchBar}
        />
      </Header>
      <Content>
        <List data={allApplications} testId={TestId.AppList} />
      </Content>
    </LayoutCell>
  );
};

export default ApplicationList;

const Header = styled.div`
  display: flex;
  padding: 0 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
`;

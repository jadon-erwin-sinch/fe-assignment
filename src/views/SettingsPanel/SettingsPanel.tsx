import { styled } from "styled-components";
import { useApp, useApplicationApi } from "../../hooks";
import { Button, LayoutCell } from "../../components";
import EnvironmentField from "./EnvironmentField";
import ConfigurationField from "./ConfigurationField";
import { COLOR_RED, TestId } from "../../utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonPanel from "./SkeletonPanel";
import { ApplicationInput } from "../../api";
import { toast } from "react-toastify";

const SettingsPanel = () => {
  const { selectedApplication, updateAllApplications } = useApp();
  const { deleteApplicationMethod, getApplicationListMethod } =
    useApplicationApi();
  const navigate = useNavigate();

  const onEditApp = useCallback(() => {
    if (!selectedApplication) {
      return;
    }

    const currentAppDetails: ApplicationInput = {
      name: selectedApplication.name,
      description: selectedApplication.description,
    };

    navigate(`/${selectedApplication.id}/edit-application`, {
      state: currentAppDetails,
    });
  }, [selectedApplication, navigate]);

  const onDeleteApp = useCallback(() => {
    if (!selectedApplication) {
      return;
    }

    deleteApplicationMethod({
      applicationId: selectedApplication.id,
    }).then(() => {
      
        toast.success("Application deleted successfully");

        getApplicationListMethod().then((applications) => {
          if (applications) {
            updateAllApplications(applications);
            navigate(`/${applications[0].id}`);
          }
        });      
    })
    .catch(() => {
      toast.error("Something went wrong");
      }
    );
  }, [
    deleteApplicationMethod,
    getApplicationListMethod,
    selectedApplication,
    updateAllApplications,
    navigate,
  ]);

  if (!selectedApplication) {
    return <SkeletonPanel />;
  }

  return (
    <LayoutCell
      heading={`Manage settings for ${selectedApplication?.name}`}
      testId={TestId.AppSettings}
      headerContent={
        <>
          {/* Use inline styling for this button */}
          <input
            type = "button"
            onClick={onEditApp}
            value="Edit app"
          
          />

          {/* Use CSS/styling Framework this button */}
          <input
            type = "button"
            value = "Delete app"
            onClick = {onDeleteApp}
          />
        </>
      }
    >
      <Wrapper>
        <EnvironmentField />
        <ConfigurationField />
      </Wrapper>
    </LayoutCell>
  );
};

export default SettingsPanel;

const Wrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  padding: 0 20px;
`;

const EditButton = styled.div`
  margin-right: 10px;
`;

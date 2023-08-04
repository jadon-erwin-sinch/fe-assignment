import { useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownField } from "../../components";
import { useApp, useEnvironmentApi } from "../../hooks";
import { EnvironmentInput } from "../../api";
import { TestId } from "utils";
import { toast } from "react-toastify";

const EnvironmentField = () => {
  const { getEnvironmentListMethod, deleteEnvironmentMethod } =
    useEnvironmentApi();
  const {
    selectedApplication,
    allEnvironments,
    selectedEnvironment,
    updateAllEnvironments,
    toggleSelectedEnvironment,
  } = useApp();
  const navigate = useNavigate();

  const onDropdownChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const currentOption = e.target.value;
      const currentEnvironment = allEnvironments?.find(
        (env) => env.id === currentOption
      );

      if (currentEnvironment) {
        toggleSelectedEnvironment(currentEnvironment);
      }
    },
    [allEnvironments, toggleSelectedEnvironment]
  );

  const onAddEnvironment = useCallback(() => {
    if (!selectedApplication) {
      return;
    }

    navigate(`/${selectedApplication.id}/create-environment`);
  }, [navigate, selectedApplication]);

  const onEditEnvironment = useCallback(() => {
    if (!selectedApplication || !selectedEnvironment) {
      return;
    }

    const currentEnvDetails: EnvironmentInput = {
      name: selectedEnvironment.name,
      region: selectedEnvironment.region,
    };

    navigate(
      `/${selectedApplication.id}/edit-environment/${selectedEnvironment.id}`,
      {
        state: currentEnvDetails,
      }
    );
  }, [navigate, selectedApplication, selectedEnvironment]);

  const onDeleteEnvironment = useCallback(() => {
    if (!selectedApplication || !selectedEnvironment) {
      return;
    }

    deleteEnvironmentMethod({
      applicationId: selectedApplication.id,
      environmentId: selectedEnvironment.id,
    }).then(() => {
      getEnvironmentListMethod({
        applicationId: selectedApplication.id,
      }).then((environments) => {
        if (environments) {
          updateAllEnvironments(environments);
          toggleSelectedEnvironment(environments[0]);
        }
      });
    });
    toast.success("Environment deleted successfully");
  }, [
    deleteEnvironmentMethod,
    selectedApplication,
    selectedEnvironment,
    updateAllEnvironments,
    getEnvironmentListMethod,
    toggleSelectedEnvironment,
  ]);

  return (
    <DropdownField
      options={allEnvironments}
      id="environment"
      label="Environment"
      emptyText="Create an environment"
      onChange={onDropdownChange}
      onAdd={onAddEnvironment}
      onEdit={onEditEnvironment}
      onDelete={selectedEnvironment && onDeleteEnvironment}
      testId={TestId.EnvDropdown}
      addButtonTestId={TestId.CreateEnvButton}
      editButtonTestId={TestId.EditEnvButton}
      deleteButtonTestId={TestId.DeleteEnvButton}
      value={selectedEnvironment?.id}
    />
  );
};

export default EnvironmentField;

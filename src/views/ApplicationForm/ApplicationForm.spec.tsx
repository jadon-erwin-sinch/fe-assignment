import { fireEvent, render, screen } from "@testing-library/react";
import { AppProvider } from "hooks";
import ApplicationForm from "./ApplicationForm";
import { BrowserRouter } from "react-router-dom";
import { TestId } from "utils";

describe("ApplicationForm", () => {
  it("should display form errors when invalid data is provided", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ApplicationForm />
        </AppProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId(TestId.AppNameInput), {
      target: { value: "Valid app name" },
    });

    fireEvent.change(screen.getByTestId(TestId.AppDescInput), {
      target: { value: "Invalid, desc" },
    });

    fireEvent.change(screen.getByTestId(TestId.EnvNameInput), {
      target: { value: "Valid env name" },
    });

    fireEvent.change(screen.getByTestId(TestId.EnvNameInput), {
      target: { value: "Invalid name?" },
    });

    fireEvent.change(screen.getByTestId(TestId.ConfigJsonInput), {
      target: { value: "{}" },
    });

    fireEvent.submit(screen.getByTestId(TestId.AppForm));

    expect(screen.getByTestId(TestId.AppDescError)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.EnvNameError)).toBeInTheDocument();
  });

  it("should keep submit button disabled when values are missing", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ApplicationForm />
        </AppProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId(TestId.AppNameInput), {
      target: { value: "Valid app name" },
    });

    expect(screen.getByTestId(TestId.FormSubmitButton)).toHaveAttribute(
      "disabled"
    );
  });
});

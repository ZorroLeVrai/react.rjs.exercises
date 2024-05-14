import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { TaskStatus } from "../../../taskStatus";
import Task from "../../components/Task";
import { Provider } from "react-redux";
import { store } from "../../store";

describe(Task, () => {
  const taskData = { id: 1, totalTime: "1d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "My Task"};

  it.each([
    ["2d", "1d", 50],
    ["1d", "0m", 100],
    ["1h", "60m", 0],
    ["2h", "3600s", 50]
  ])('should display the right progessbar value', (totalTime, timeToComplete, expectedProgressValue) => {

    render(
      <Provider store={store}>
        <Task taskData={{...taskData, totalTime, timeToComplete}} isFirst={false} isLast={false} />
      </Provider>
    );
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute('value', String(expectedProgressValue));
    expect(progressBar).toHaveAttribute('max', "100");
  });

  it("should not display the move to top icon", () => {
    render(
      <Provider store={store}>
        <Task taskData={{...taskData, totalTime: "2d", timeToComplete: "1d"}} isFirst={true} isLast={false} />
      </Provider>
    );
    expect(screen.queryByTestId("task_movetop")).not.toBeInTheDocument();
  });

  it("should not display the move to bottom icon", () => {
    render(
      <Provider store={store}>
        <Task taskData={{...taskData, totalTime: "2d", timeToComplete: "1d"}} isFirst={false} isLast={true} />
      </Provider>
    );
    expect(screen.queryByTestId("task_movebottom")).not.toBeInTheDocument();
  });

  it("should display the move to bottom and the move to top icons", () => {
    render(
      <Provider store={store}>
        <Task taskData={{...taskData, totalTime: "2d", timeToComplete: "1d"}} isFirst={false} isLast={false} />
      </Provider>
    );
    expect(screen.queryByTestId("task_movetop")).toBeInTheDocument();
    expect(screen.queryByTestId("task_movebottom")).toBeInTheDocument();
  });
});
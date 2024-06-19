import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { TaskStatus } from "../../../taskStatus";
import Task from "../../components/Task";

describe(Task, () => {
  it.each([
    ["2d", "1d", 50],
    ["1d", "0m", 100],
    ["1h", "60m", 0],
    ["2h", "3600s", 50]
  ])('should display the right progessbar value',
      (totalTime, timeToComplete, expectedProgressValue) => {
      render(<Task totalTime={totalTime} timeToComplete={timeToComplete} status={TaskStatus.IN_PROGRESS} taskName="My Task" isFirst={false} isLast={false} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute('value', String(expectedProgressValue));
      expect(progressBar).toHaveAttribute('max', "100");
  });

  it("should not display the move to top icon", () => {
    render(<Task totalTime="2d" timeToComplete="1d" status={TaskStatus.IN_PROGRESS} taskName="My Task" isFirst={true} isLast={false} />);
    expect(screen.queryByTestId("task_movetop")).not.toBeInTheDocument();
  });

  it("should not display the move to bottom icon", () => {
    render(<Task totalTime="2d" timeToComplete="1d" status={TaskStatus.IN_PROGRESS} taskName="My Task" isFirst={false} isLast={true} />);
    expect(screen.queryByTestId("task_movebottom")).not.toBeInTheDocument();
  });

  it("should display the move to bottom and the move to top icons", () => {
    render(<Task totalTime="2d" timeToComplete="1d" status={TaskStatus.IN_PROGRESS} taskName="My Task" isFirst={false} isLast={false} />);
    expect(screen.queryByTestId("task_movetop")).toBeInTheDocument();
    expect(screen.queryByTestId("task_movebottom")).toBeInTheDocument();
  });
});
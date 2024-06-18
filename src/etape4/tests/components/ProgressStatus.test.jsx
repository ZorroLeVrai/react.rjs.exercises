import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { TaskStatus } from '../../../taskStatus';
import ProgressStatus from "../../components/ProgressStatus";

describe(ProgressStatus, () => {
  it.each([
    [0, 1, 0],
    [10, 100, 10],
    [180, 200, 90],
    [77, 77, 100]
  ])("should render ProgressStatus with right value $expectedValue", (progressValue, progressMax, expectedValue) => {
    render(<ProgressStatus progressValue={progressValue} progressMax={progressMax} title="En Cours" status={TaskStatus.IN_PROGRESS} name="tache1" />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute('value', String(expectedValue));
    expect(progressBar).toHaveAttribute('max', "100");
  });
});
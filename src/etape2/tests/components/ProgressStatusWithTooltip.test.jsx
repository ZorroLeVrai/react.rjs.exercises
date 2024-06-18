import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import ProgressStatusWithTooltip from "../../components/ProgressStatusWithTooltip";
import { TaskStatus } from "../../../taskStatus";

describe('ProgressStatusWithTooltip', () => {
  it('should show a tooltip when you hover on the progress bar', async () => {
    render(<ProgressStatusWithTooltip
      progressValue={50}
      progressMax={100}
      status={TaskStatus.IN_PROGRESS}
      taskName="First Task"
      totalTime="2d"
      timeToComplete="1d"/>);
    expect(screen.queryByTestId("progressbar_tooltip")).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole("progressbar"));
    expect(screen.queryByTestId("progressbar_tooltip")).toBeInTheDocument();
  });

  it('should not show a tooltip when you are not hovering on the progress bar', async () => {
    render(<ProgressStatusWithTooltip
      progressValue={50}
      progressMax={100}
      status={TaskStatus.IN_PROGRESS}
      taskName="First Task"
      totalTime="2d"
      timeToComplete="1d"/>);
    expect(screen.queryByTestId("progressbar_tooltip")).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole("progressbar"));
    expect(screen.queryByTestId("progressbar_tooltip")).toBeInTheDocument();
    await userEvent.unhover(screen.getByRole("progressbar"));
    expect(screen.queryByTestId("progressbar_tooltip")).not.toBeInTheDocument();
  });
});
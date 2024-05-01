import { TaskStatus } from "../taskStatus";

export const statusMap = new Map();
statusMap.set(TaskStatus.NOT_STARTED, "not_started");
statusMap.set(TaskStatus.IN_PROGRESS, "in_progress");
statusMap.set(TaskStatus.PAUSED, "paused");
statusMap.set(TaskStatus.COMPLETED, "completed");

/**
 * 
 * @param {string} statusSymbol - Status name
 * @returns {string} a description for the status
 */
export function getStatusName(statusSymbol) {
  return statusMap.get(statusSymbol);
}

export const composeStyles = (...args) => {
  return args.join(" ");
}

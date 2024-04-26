import { TaskStatus } from "../taskStatus";

export const statusMap = new Map();
statusMap.set(TaskStatus.NOT_STARTED, "Non débutée");
statusMap.set(TaskStatus.IN_PROGRESS, "En cours");
statusMap.set(TaskStatus.PAUSED, "En pause");
statusMap.set(TaskStatus.COMPLETED, "Terminée");

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

/**
 * Generate id numbers
 * @generator
 * @yields {number}
 * @returns {Generator<number>}
 */
function* createIdGenerator() {
  let index = 0;
  while (true) {
    yield ++index;
  }
}

/**
 * @type {Generator<number>}
 */
export const idGenerator = createIdGenerator();

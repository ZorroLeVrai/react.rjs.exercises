import { TaskStatus } from "../taskStatus";

export const statusMap = new Map();
statusMap.set(TaskStatus.NOT_STARTED, "Non débutée");
statusMap.set(TaskStatus.IN_PROGRESS, "En cours");
statusMap.set(TaskStatus.PAUSED, "En pause");
statusMap.set(TaskStatus.COMPLETED, "Complétée");

export function getStatusName(statusSymbol) {
  return statusMap.get(statusSymbol);
}

export function composeStyles(...args) {
  return args.join(" ");
}

function* createIdGenerator() {
  let index = 0;
  while (true) {
    yield ++index;
  }
}

export const idGenerator = createIdGenerator();

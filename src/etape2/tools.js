import { TaskStatus } from "../taskStatus";

export function getStatusName(statusSymbol) {
  switch (statusSymbol) {
    case TaskStatus.NOT_STARTED:
      return "Non débutée";
    case TaskStatus.IN_PROGRESS:
      return "En cours";
    case TaskStatus.PAUSED:
      return "En pause";
    case TaskStatus.COMPLETED:
      return "Complétée";
  }
}
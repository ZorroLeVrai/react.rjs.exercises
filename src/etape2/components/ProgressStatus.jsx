import React from 'react';
import { getStatusName } from '../tools';
import { TaskStatus } from '../../taskStatus';
import styles from "./ProgressStatus.module.css";

const ProgressStatus = ({progressValue, progressMax, status, taskName}) => {
  const factor = 100 / progressMax;
  const progress = Math.round(100 * factor * progressValue) / 100;
  const statusName = getStatusName(status);
  const statusStyle = getStatusStyle(status);
  const className = [styles.task, statusStyle].join(" ");

  return (
    <progress className={className} value={progress} max={100} status={statusName}>{taskName}</progress>
  )
}

export function getStatusStyle(statusSymbol) {
  switch (statusSymbol) {
    case TaskStatus.NOT_STARTED:
      return styles.not_started;
    case TaskStatus.IN_PROGRESS:
      return styles.in_progress;
    case TaskStatus.PAUSED:
      return styles.paused;
    case TaskStatus.COMPLETED:
      return styles.completed;
  }
}

export default ProgressStatus;
import React from 'react';
import styles from "./ProgressStatus.module.css";

const ProgressStatus = ({progressValue, progressMax, status, taskName}) => {
  const factor = 100 / progressMax;
  const progress = Math.round(100 * factor * progressValue) / 100;

  return (
    <progress className={styles.task} value={progress} max={100} status={status}>{taskName}</progress>
  )
}

export default ProgressStatus;
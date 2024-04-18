import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import styles from "./Task.module.css";
import ProgressStatus from './ProgressStatus';
import { getTimeValue } from '../../timeConverter';

const Task = ({totalTime, timeToComplete, status, taskName}) => {
  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className={styles.container}>
          <span className={styles.text}>{taskName}</span>
        </div>
        <ProgressStatus
          progressValue={progressTimeInSeconds}
          progressMax={totalTimeInSeconds}
          status={status}
          taskName={taskName}/>
      </div>
    </ErrorBoundary>
  );
}

export default Task;
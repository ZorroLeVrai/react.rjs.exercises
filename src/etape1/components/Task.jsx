import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import styles from "./Task.module.css";
import ProgressStatus from './ProgressStatus';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { getTimeValue } from '../../timeConverter';

const Task = ({totalTime, timeToComplete, status, taskName, isFirst, isLast}) => {
  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className={styles.container}>
          <span className={styles.text}>{taskName}</span>
          <span className={styles.icon}>
            {isFirst || <GoMoveToTop/>}
            {isLast || <GoMoveToBottom />}
            <FaEdit />
            <TiDelete/>
          </span>
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
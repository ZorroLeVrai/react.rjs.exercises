import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { getTimeValue } from '../../timeConverter';
import styles from "./Task.module.css";
import PropTypes from 'prop-types';

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
            {isFirst || <GoMoveToTop data-testid="task_movetop"/>}
            {isLast || <GoMoveToBottom data-testid="task_movebottom"/>}
            <FaEdit />
            <TiDelete/>
          </span>
        </div>
        <ProgressStatusWithTooltip
          progressValue={progressTimeInSeconds}
          progressMax={totalTimeInSeconds}
          status={status}
          taskName={taskName}
          totalTime={totalTime}
          timeToComplete={timeToComplete}/>
      </div>
    </ErrorBoundary>
  );
}

Task.propTypes = {
  totalTime: PropTypes.string.isRequired,
  timeToComplete: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
};

Task.defaultProp = {
  isFirst: false,
  isLast: false
};

export default Task;
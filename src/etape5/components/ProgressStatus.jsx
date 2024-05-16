import React from 'react';
import { composeStyles } from '../tools';
import { TaskStatus } from '../../taskStatus';
import styles from "./ProgressStatus.module.css";
import PropTypes from 'prop-types';

const ProgressStatus = ({progressValue, progressMax, title, status, name}) => {
  const factor = progressMax ? 100 / progressMax : 0;
  const progress = Math.round(100 * factor * progressValue) / 100;
  const statusStyle = getStatusStyle(status);
  const className = composeStyles(styles.task, statusStyle);

  return (
    <div className={styles.taskBox}>
      <progress className={className} value={progress} max={100}>
        {name}
      </progress>
      <div className={styles.progressText}>{title}: {progress} %</div>
    </div>
  )
}

ProgressStatus.propTypes = {
  progressValue: PropTypes.number.isRequired,
  progressMax: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function getStatusStyle(statusSymbol) {
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

export default React.memo(ProgressStatus);
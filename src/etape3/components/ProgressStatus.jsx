import { getStatusName } from '../tools';
import { TaskStatus } from '../../taskStatus';
import styles from "./ProgressStatus.module.css";
import PropTypes from 'prop-types';

const ProgressStatus = ({progressValue, progressMax, title, status, taskName}) => {
  const factor = 100 / progressMax;
  const progress = Math.round(100 * factor * progressValue) / 100;
  const statusStyle = getStatusStyle(status);
  const className = [styles.task, statusStyle].join(" ");

  return (
    <progress className={className} value={progress} max={100} title={title}>{taskName}</progress>
  )
}

ProgressStatus.propTypes = {
  progressValue: PropTypes.number.isRequired,
  progressMax: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.symbol.isRequired,
  taskName: PropTypes.string.isRequired
};

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
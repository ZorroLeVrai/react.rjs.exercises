import { composeStyles } from '../tools';
import { TaskStatus } from '../../taskStatus';
import styles from "./ProgressStatus.module.css";
import PropTypes from 'prop-types';

const ProgressStatus = ({progressValue, progressMax, title, status, name}) => {
  const factor = 100 / progressMax;
  const progress = Math.round(100 * factor * progressValue) / 100;
  const statusStyle = getStatusStyle(status);
  const className = composeStyles(styles.task, statusStyle);

  return (
    <progress className={className} value={progress} max={100} title={title}>{name}</progress>
  )
}

ProgressStatus.propTypes = {
  progressValue: PropTypes.number.isRequired,
  progressMax: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.symbol.isRequired,
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

export default ProgressStatus;
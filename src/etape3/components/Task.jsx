import { ErrorBoundary } from "react-error-boundary";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { getTimeValue } from '../../timeConverter';
import styles from "./Task.module.css";
import PropTypes from 'prop-types';
import { getStatusName } from "../tools";

const Task = ({id, totalTime, timeToComplete, status, taskName, isFirst, isLast, onDeleteTask}) => {
  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;
  const statusName = getStatusName(status);

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className="flexSpaceBetween">
          <span className={styles.taskName}>{taskName}</span>
          <span className={styles.icon}>
            {isFirst || <GoMoveToTop data-testid="task_movetop"/>}
            {isLast || <GoMoveToBottom data-testid="task_movebottom"/>}
            <FaEdit />
            <TiDelete onClick={() => onDeleteTask(id)}/>
          </span>
        </div>
        <ProgressStatusWithTooltip
          progressValue={progressTimeInSeconds}
          progressMax={totalTimeInSeconds}
          title={statusName}
          status={status}
          name={taskName}
          totalTime={totalTime}
          timeToComplete={timeToComplete}/>
      </div>
    </ErrorBoundary>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  totalTime: PropTypes.string.isRequired,
  timeToComplete: PropTypes.string.isRequired,
  status: PropTypes.symbol.isRequired,
  taskName: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

Task.defaultProp = {
  isFirst: false,
  isLast: false
};

export default Task;
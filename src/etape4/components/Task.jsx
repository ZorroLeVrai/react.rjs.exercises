import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import TaskForm from "./TaskForm";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { getTimeValue } from '../../timeConverter';
import PropTypes from 'prop-types';
import { getStatusName } from "../tools";
import { deleteTask, editTask, moveDownTask, moveUpTask } from "../slices/taskGroupSlice";
import styles from "./Task.module.css";

const Task = ({taskData, isFirst, isLast}) => {
  const { id, totalTime, timeToComplete, status, name: taskName } = taskData;
  const dispatch = useDispatch();

  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;
  const statusName = getStatusName(status);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditTask = () => {
    setIsEditMode(current => !current);
  };

  const handleFormEdit = (currentTask) => {
    setIsEditMode(false);
    dispatch(editTask(currentTask));
  };

  const handleTaskDelete = () => {
    dispatch(deleteTask(taskData));
  }

  const handleTaskMoveUp = () => {
    dispatch(moveUpTask(taskData));
  }

  const handleTaskMoveDown = () => {
    dispatch(moveDownTask(taskData));
  }

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className="flexSpaceBetween">
          <span className={styles.taskName}>{taskName}</span>
          <span className={styles.icon}>
            {isFirst || <GoMoveToTop onClick={handleTaskMoveUp} data-testid="task_movetop"/>}
            {isLast || <GoMoveToBottom onClick={handleTaskMoveDown} data-testid="task_movebottom"/>}
            <FaEdit onClick={handleEditTask}/>
            <TiDelete onClick={handleTaskDelete}/>
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
        {isEditMode && <TaskForm formTitle={`Modifiez la tâche ${taskName}`} taskData={{id, totalTime, timeToComplete, status, taskName}} handleFormSubmit={handleFormEdit}/>}
      </div>
    </ErrorBoundary>
  );
}

Task.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalTime: PropTypes.string.isRequired,
    timeToComplete: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

Task.defaultProp = {
  isFirst: false,
  isLast: false
};

export default Task;
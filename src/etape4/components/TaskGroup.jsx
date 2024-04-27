import { useState } from 'react';
import Task from './Task';
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { TaskStatus } from '../../taskStatus';
import TaskForm from './TaskForm';
import { getTimeInFormat, getTimeValue } from '../../timeConverter';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { composeStyles } from '../tools';
import { useSelector, useDispatch } from "react-redux";
import { addTask } from '../slices/taskGroupSlice';
import PropTypes from 'prop-types';
import styles from "./TaskGroup.module.css";

export const TaskGroup = ({groupName}) => {
  const tasks = useSelector(state => state.taskGroup.tasks);
  const dispatch = useDispatch();

  const [showTasks, setShowTasks] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { total: totalTimeInSeconds, remaining: remainingTimeInSeconds } = tasks
    .map(task => new TimeMetrics(getTimeValue(task.totalTime), getTimeValue(task.timeToComplete)))
    .reduce((accumulator, current) => accumulator.add(current), new TimeMetrics(0, 0));

  const totalTime = getTimeInFormat(totalTimeInSeconds);
  const totalTimeToComplete = getTimeInFormat(remainingTimeInSeconds);
  const ArrowComponent = showTasks ? IoMdArrowDropdown : IoMdArrowDropright;
  const EditIcon = showForm ? IoMdRemoveCircle : IoMdAddCircle;
  const arrowGroupStyles = tasks.length ? styles.groupTaskIcon : composeStyles(styles.groupTaskIcon, styles.hidden);
  const groupNameStyles = composeStyles("flexSpaceBetween", styles.groupNameMargin);

  const groupTitle = (tasks.length > 0) ? `${groupName} (${tasks.length})`:groupName;

  const handleShowTasks = () => {
    setShowTasks(current => !current);
  };

  const handleShowForm = () => {
    setShowForm(current => !current);
  };

  const handleSubmitForm = (newTask) => {
    dispatch(addTask(newTask));
  }

  return (
    <>
      <div className={groupNameStyles}>
        <span>{groupTitle}</span>
        <span className={styles.icon}>
          <EditIcon onClick={handleShowForm}/>
        </span>
      </div>
      <div className={styles.groupTaskContainer}>
        <div className={arrowGroupStyles}>
          <ArrowComponent onClick={handleShowTasks}/>
        </div>
        <div className={styles.groupTaskItemGrow}>
          <ProgressStatusWithTooltip
              progressValue={totalTimeInSeconds - remainingTimeInSeconds}
              progressMax={totalTimeInSeconds}
              title={groupName}
              status={TaskStatus.COMPLETED}
              name={groupName}
              totalTime={totalTime}
              timeToComplete={totalTimeToComplete}/>
          {showForm && <TaskForm formTitle="Ajoutez une tâche" handleFormSubmit={handleSubmitForm}/>}
          {
            showTasks && <div>
              {tasks.map(taskToComponent)}
            </div>
          }
        </div>
      </div>
    </>
  );

  function taskToComponent(task, index, tasks) {
    const isFirst = (index === 0);
    const isLast = (index === tasks.length - 1);
  
    return <Task 
      key={task.id}
      taskData={task}
      isFirst={isFirst}
      isLast={isLast} />
  }
};

TaskGroup.propTypes = {
  groupName: PropTypes.string.isRequired
}

class TimeMetrics {
  constructor(total, remaining) {
    this.total = total;
    this.remaining = remaining;
  }

  add(otherTimeMetrics) {
    this.total += otherTimeMetrics.total;
    this.remaining += otherTimeMetrics.remaining;
    return this;
  }
}

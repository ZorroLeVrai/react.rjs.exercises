import { getTimeInFormat, getTimeValue } from '../../timeConverter';
import PropTypes from 'prop-types';
import Task from './Task';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { TaskStatus } from '../../taskStatus';
import { useState } from 'react';
import styles from "./TaskGroup.module.css";
import { composeStyles } from '../tools';
import TaskForm from './TaskForm';

/**
 * 
 * @param {string} state - Action state
 * @param {{type: string, payload: *}} action - the dispatched action
 * @returns {*} the computed state
 */
function reducer(state, action) {
  
}

const TaskGroup = ({groupName, tasks, updateTasks}) => {
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

  const handleShowTasks = () => {
    setShowTasks(current => !current);
  };

  const handleShowForm = () => {
    setShowForm(current => !current);
  };

  //TODO: use a reducer???
  const handleSubmitForm = (newTask) => {
    updateTasks([...tasks, newTask]);
  }

  const handleDeleteTask = (taskId) => {
    updateTasks(tasks.filter(task => task.id !== taskId));
  }

  const handleEditTask = (editedTask) => {
    const taskIndex = tasks.findIndex(t => t.id === editedTask.id);
    if (taskIndex < 0)
      throw new Error("Task id was not found");

    updateTasks([...tasks.slice(0, taskIndex), editedTask, ...tasks.slice(taskIndex+1)]);
  }

  const handleSwapTasks = (firstId, secondId) => {
    const tempTasks = [...tasks];
    //exchange indexes
    [tempTasks[firstId], tempTasks[secondId]] = [tempTasks[secondId], tempTasks[firstId]];
    updateTasks(tempTasks);
  }

  const handleTaskUp = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > 0) {
      handleSwapTasks(taskIndex, taskIndex-1);
    }
  }

  const handleTaskDown = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex < 0)
      throw new Error("Task id was not found");

    if (taskIndex + 1 < tasks.length) {
      handleSwapTasks(taskIndex, taskIndex+1);
    }
  }

  return (
    <>
      <div className={groupNameStyles}>
        <span>{groupName}</span>
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
    const {id, totalTime, timeToComplete, status, name: taskName} = task;
  
    return <Task 
      key={id}
      id={id}
      totalTime={totalTime}
      timeToComplete={timeToComplete}
      status={status}
      taskName={taskName}
      isFirst={isFirst}
      isLast={isLast}
      onEditTask={handleEditTask}
      onDeleteTask={handleDeleteTask}
      onTaskUp={handleTaskUp}
      onTaskDown={handleTaskDown}/>
  }
};

TaskGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalTime: PropTypes.string.isRequired,
    timeToComplete: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  updateTasks: PropTypes.func.isRequired
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

export default TaskGroup;
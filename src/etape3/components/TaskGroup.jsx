import { getTimeInFormat, getTimeInSeconds } from '../../timeConverter';
import PropTypes from 'prop-types';
import Task from './Task';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdAddCircle } from "react-icons/io";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { TaskStatus } from '../../taskStatus';
import { useState } from 'react';
import styles from "./TaskGroup.module.css";
import { composeStyles } from '../tools';

const TaskGroup = ({groupName, tasks}) => {
  const [showTasks, setShowTasks] = useState(true);
  const { total: totalTimeInSeconds, remaining: remainingTimeInSeconds } = tasks
    .map(task => new TimeMetrics(getTimeInSeconds(task.totalTime), getTimeInSeconds(task.timeToComplete)))
    .reduce((accumulator, current) => accumulator.add(current), new TimeMetrics(0, 0));

  const totalTime = getTimeInFormat(totalTimeInSeconds);
  const totalTimeToComplete = getTimeInFormat(remainingTimeInSeconds);
  const ArrowComponent = showTasks ? IoMdArrowDropdown : IoMdArrowDropright;
  const arrowGroupStyles = tasks.length ? styles.groupTaskIcon : composeStyles(styles.groupTaskIcon, styles.hidden);
  const groupNameStyles = composeStyles("flexSpaceBetween", styles.groupNameMargin);

  const handleShowTasks = () => {
    setShowTasks(current => !current);
  };

  return (
    <>
      <div className={groupNameStyles}>
        <span>{groupName}</span>
        <span className={styles.icon}>
          <IoMdAddCircle />
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
          {
            showTasks && <div>
              {tasks.map(taskToComponent)}
            </div>
          }
        </div>
      </div>
      
      
    </>
  )
};

TaskGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalTime: PropTypes.string.isRequired,
    timeToComplete: PropTypes.string.isRequired,
    status: PropTypes.symbol.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
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

function taskToComponent(task, index, taskArray) {
  const isFirst = (index === 0);
  const isLast = (index === taskArray.length - 1);
  const {id, totalTime, timeToComplete, status, name: taskName} = task;

  return <Task 
    key={id}
    id={id}
    totalTime={totalTime}
    timeToComplete={timeToComplete}
    status={status}
    taskName={taskName}
    isFirst={isFirst}
    isLast={isLast}/>
}

export default TaskGroup;
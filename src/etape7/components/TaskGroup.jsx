import React, { useCallback, useState } from 'react';
import Task from './Task';
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { TaskStatus } from '../../taskStatus';
import TaskForm from './TaskForm';
import { getTimeInFormat, getTimeValue } from '../../timeConverter';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { composeStyles } from '../tools';
import { useDispatch, useSelector } from "react-redux";
import { addTask } from '../slices/taskGroupSlice';
import { useTranslation } from 'react-i18next';
import TimeMetrics from '../TimeMetrics';
import PropTypes from 'prop-types';
import styles from "./TaskGroup.module.css";

const LocalTaskGroup = ({groupName}) => {
  const tasks = useSelector(state => state.taskGroup.tasks);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const handleSubmitForm = useCallback((newTask) => {
    dispatch(addTask(newTask));
  }, [dispatch]);

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
          {showForm && <TaskForm formTitle={t("add_task")} handleFormSubmit={handleSubmitForm}/>}
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

LocalTaskGroup.propTypes = {
  groupName: PropTypes.string.isRequired
}

export const TaskGroup = React.memo(LocalTaskGroup);


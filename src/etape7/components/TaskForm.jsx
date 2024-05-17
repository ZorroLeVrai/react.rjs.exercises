import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TaskStatus } from '../../taskStatus';
import { composeStyles, statusMap } from '../tools';
import { getTimeValue } from "../../timeConverter";
import PropTypes from 'prop-types';
import styles from "./TaskForm.module.css";
import { Transition } from 'react-transition-group';
import { useTranslation } from "react-i18next";

const datePattern = /^(\d+[dhms]\s*)+$/;

const timeToCompleteField = "timeToComplete";
const totalTimeField = "totalTime";

const schema = z.object({
  taskName: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le nom de la tâche"),
  totalTime: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps total")
    .refine(value => datePattern.test(value ?? ""), "Le temps total doit être au format '1d 2h 3m 4s'"),
  timeToComplete: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps restant")
    .refine(value => datePattern.test(value ?? ""), "Le temps restant doit être au format '1d 2h 3m 4s'"),
  taskStatus: z.string({required_error: "champ requis"})
    .min(1, "Sélectionnez un status pour la tâche")
}).refine(schema => {
  const { totalTime, timeToComplete } = schema;
  if (totalTime && timeToComplete) {
    return getTimeValue(totalTime) >= getTimeValue(timeToComplete);
  }
  return true;
}, {message: "Le reste à faire doit être inférieur au temps total de la tâche", path: [timeToCompleteField]});

const defaultFormValues = {
  taskName: "",
  totalTime: "",
  timeToComplete: "",
  taskStatus: ""
};

const LocalTaskForm = ({formTitle, taskData, handleFormSubmit}) => {
  const taskFormValue = taskData ? {...taskData, taskStatus: taskData.status} : defaultFormValues;
  const { t } = useTranslation();

  const { register, formState, handleSubmit, reset, getValues, setValue }
    = useForm({resolver: zodResolver(schema), mode: "onChange", defaultValues: taskFormValue});
  const {errors, isValid, isSubmitSuccessful} = formState;

  const { gridFormContainer, gridDoubleItem } = styles;
  const warningStyle = composeStyles("center-text", "warning-text", gridDoubleItem);

  const submitHandler = formData => {
    const { taskName, totalTime, timeToComplete, taskStatus } = formData;
    const myTask = {
      id: taskFormValue.id,
      totalTime,
      timeToComplete,
      status: TaskStatus[taskStatus],
      name: taskName
    };

    handleFormSubmit(myTask);
  };

  const handleStatusSelect = (event) => {
    let newTimeToComplete = null;
    const taskStatusValue = event.target.value;
    switch (taskStatusValue) {
      case TaskStatus.NOT_STARTED: {
          const totalTime = getValues(totalTimeField);
          if (datePattern.test(totalTime ?? "")) {
            newTimeToComplete = totalTime;
          }
        }
        break;
      case TaskStatus.COMPLETED:
        newTimeToComplete = "0d";
        break;
    }

    if (newTimeToComplete) {
      setValue("taskStatus", taskStatusValue);
      setValue(timeToCompleteField, newTimeToComplete, { shouldValidate: true });
    }
  }

  const resetFormData = (event) => {
    event.preventDefault();
    reset();
  };

  const nodeRef = useRef(null);

  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const durationInMs = 2000;

  const defaultStyle = {
    transition: `opacity ${durationInMs}ms ease-in-out`,
    opacity: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };
  
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={durationInMs}>
      {state => (
        <div ref={nodeRef} style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <form className="form-margin" onSubmit={handleSubmit(submitHandler)}>
            <h2 className="center-text">{formTitle}</h2>
            <div className={gridFormContainer}>
              {errors.taskName && <div className={warningStyle}>{errors.taskName.message}</div>}
              <label htmlFor="task-name">{t("task_name")}</label>
              <input {...register("taskName")} id="task-name" type="text" placeholder={t("task_name")}/>
              {errors.totalTime && <div className={warningStyle}>{errors.totalTime.message}</div>}
              <label htmlFor="task-total-time">{t("estimated_total_time")}</label>
              <input {...register(totalTimeField)} id="task-total-time" type="text" placeholder={t("time_place_holder")}/>
              {errors.taskStatus && <div className={warningStyle}>{errors.taskStatus.message}</div>}
              <label htmlFor="task-status">{t("task_status")}</label>
              <select {...register("taskStatus", {onChange: handleStatusSelect})} id="task-status">
                <option value="">{t("select_task_status")}</option>
                {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0]}>{t(statusItem[1])}</option>)}
              </select>
              {errors.timeToComplete && <div className={warningStyle}>{errors.timeToComplete.message}</div>}
              <label htmlFor="task-remaining-time">{t("estimated_remaining_time")}</label>
              <input {...register(timeToCompleteField)} id="task-remaining-time" type="text" placeholder={t("time_place_holder")}/>
            </div>
            
            <div className="flexSpaceBetween">
              <div className={styles.buttonVerticalMargin}>
                <button onClick={resetFormData}>
                  {t("reset_form")}
                </button>
              </div>
              <div className="flexItemRightAlign">
                <input disabled={!isValid} type="submit" value={t("submit_form")} />
              </div>
            </div>
          </form>
        </div>
      )}
    </Transition>
  )
};

LocalTaskForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  taskData: PropTypes.shape({
    id: PropTypes.number,
    totalTime: PropTypes.string,
    timeToComplete: PropTypes.string,
    status: PropTypes.string,
    taskName: PropTypes.string
  }),
  handleFormSubmit: PropTypes.func.isRequired,
};

LocalTaskForm.defaultProp = {
  taskData: null
};

const TaskForm = React.memo(LocalTaskForm);
export default TaskForm;

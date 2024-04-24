import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.css";
import { composeStyles, idGenerator, statusMap } from '../tools';
import { TaskStatus } from '../../taskStatus';
import PropTypes from 'prop-types';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const datePattern = /^(\d+[dhms]\s*)+$/;

const schema = z.object({
  taskName: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le nom de la tâche"),
  totalTime: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps total")
    .refine(value => datePattern.test(value ?? ""), "Le temps total doit être au format '1d 2h 3m 4s'"),
  remainingTime: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps restant")
    .refine(value => datePattern.test(value ?? ""), "Le temps restant doit être au format '1d 2h 3m 4s'"),
  taskStatus: z.string({required_error: "champ requis"})
    .min(1, "Sélectionnez un status pour la tâche")
});

const defaultFormValues = {
  taskName: "",
  totalTime: "",
  remainingTime: "",
  taskStatus: ""
};

const TaskForm = ({handleFormSubmit}) => {
  const { register, handleSubmit, reset, formState } = useForm({resolver: zodResolver(schema), mode: "onChange", defaultValues: defaultFormValues});
  const {errors, isDirty, isValid, isSubmitSuccessful} = formState;
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const submitHandler = formData => {
    const { taskName, totalTime, remainingTime, taskStatus } = formData;
    const myTask = {
      id: idGenerator.next().value,
      totalTime,
      timeToComplete: remainingTime,
      status: TaskStatus[taskStatus],
      name: taskName
    };

    handleFormSubmit(myTask);
  };

  const { gridFormContainer, gridDoubleItem } = styles;
  const warningStyle = composeStyles("center-text", "warning-text", gridDoubleItem);

  return (
    <form className="form-margin" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="center-text">Ajout d'une nouvelle tâche</h2>
      <div className={gridFormContainer}>
        {errors.taskName && <div className={warningStyle}>{errors.taskName.message}</div>}
        <label htmlFor="task-name">Nom de la tâche</label>
        <input {...register("taskName", {required: "Nom de la tâche est obligatoire"})} id="task-name" type="text"/>
        {errors.totalTime && <div className={warningStyle}>{errors.totalTime.message}</div>}
        <label htmlFor="task-total-time">Temps total estimé</label>
        <input {...register("totalTime", {required: true, pattern: datePattern})} id="task-total-time" type="text"/>
        {errors.remainingTime && <div className={warningStyle}>{errors.remainingTime.message}</div>}
        <label htmlFor="task-remaining-time">Temps restant estimé</label>
        <input {...register("remainingTime", {required: true, pattern: datePattern})} id="task-remaining-time" type="text" />
        {errors.taskStatus && <div className={warningStyle}>{errors.taskStatus.message}</div>}
        <label htmlFor="task-status">Statut de la tâche</label>
        <select {...register("taskStatus", {required: true, validate: value => value !== "None"})} id="task-status" >
          <option value="">Sélectionnez un statut...</option>
          {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0].description}>{statusItem[1]}</option>)}
        </select>
      </div>
      
      {errors.totalTime && <p>{errors.totalTime.message}</p>}
      <div className="flexSpaceBetween">
        <div className={styles.buttonVerticalMargin}>
          <input type="reset"/>
        </div>
        <div className="flexRightAlign">
          <input disabled={!isDirty || !isValid} type="submit" />
        </div>
      </div>
    </form>
  )
};

TaskForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
};

export default TaskForm;

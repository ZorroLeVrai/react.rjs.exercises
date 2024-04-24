import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.css";
import { idGenerator, statusMap } from '../tools';
import { TaskStatus } from '../../taskStatus';
import PropTypes from 'prop-types';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const datePattern = /(\d+d)?\s+(\d+h)?\s+(\d+m)?\s+(\d+s)?/;

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

const TaskForm = ({handleCancel, handleFormSubmit}) => {
  const { register, handleSubmit, formState: {errors, isValid} } = useForm({resolver: zodResolver(schema)});

  const submitHandler = formData => {
    console.log("submitHandler");
    const { taskName, totalTime, remainingTime, taskStatus } = formData;
    const myTask = {
      id: idGenerator.next().value,
      totalTime,
      timeToComplete: remainingTime,
      status: TaskStatus[taskStatus],
      name: taskName
    };

    console.log({errors});
    console.log({taskStatus})

    //handleFormSubmit(myTask);
  };

  console.log({errors});  

  return (
    <form className="form-margin" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="center-text">Ajout d'une nouvelle tâche</h2>
      <div className={styles.gridFormContainer}>
        <label htmlFor="task-name">Nom de la tâche</label>
        <input {...register("taskName", {required: "Nom de la tâche est obligatoire"})} id="task-name" type="text"/>
        <label htmlFor="task-total-time">Temps total estimé</label>
        <input {...register("totalTime", {required: true, pattern: datePattern})} id="task-total-time" type="text"/>
        <label htmlFor="task-remaining-time">Temps restant estimé</label>
        <input {...register("remainingTime", {required: true, pattern: datePattern})} id="task-remaining-time" type="text" />
        <label htmlFor="task-status">Statut de la tâche</label>
        <select {...register("taskStatus", {required: true, validate: value => value !== "None"})} id="task-status" >
          <option value="">Sélectionnez un statut...</option>
          {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0].description}>{statusItem[1]}</option>)}
        </select>
      </div>
      {errors.taskName && <p>{errors.taskName.message}</p>}
      {errors.totalTime && <p>{errors.totalTime.message}</p>}
      <div className="flexSpaceBetween">
        <div className={styles.buttonVerticalMargin}>
          <input type="reset" onClick={()=>console.log("reset")}/>
        </div>
        <div className="flexRightAlign">
          <input type="submit" />
        </div>
      </div>
    </form>
  )
};

TaskForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default TaskForm;

import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.css";
import { idGenerator, statusMap } from '../tools';
import { TaskStatus } from '../../taskStatus';
import PropTypes from 'prop-types';

const TaskForm = ({handleCancel, handleFormSubmit}) => {
  const { register, handleSubmit, formState: {errors, isValid} } = useForm();

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

  const datePattern = /(\d+d)?\s+(\d+h)?\s+(\d+m)?\s+(\d+s)?/;

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
          <option value="None">Sélectionnez un statut...</option>
          {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0].description}>{statusItem[1]}</option>)}
        </select>
      </div>
      {errors.taskName && <p>{errors.taskName.message}</p>}
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

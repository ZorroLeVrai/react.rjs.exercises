import { Form, Field } from 'react-final-form';
import styles from "./TaskForm.module.css";
import { idGenerator, statusMap } from '../tools';
import { TaskStatus } from '../../taskStatus';
import PropTypes from 'prop-types';

const TaskForm = ({handleCancel, handleFormSubmit}) => {
  const onSubmit = (e) => {
    const { taskName, totalTime, remainingTime, taskStatus } = e;
    const myTask = {
      id: idGenerator.next().value,
      totalTime,
      timeToComplete: remainingTime,
      status: TaskStatus[taskStatus],
      name: taskName
    };

    handleFormSubmit(myTask);
  };
  const validate = (e) => { /* fonction qui retourne les erreurs de validation */ }

  return (
    <Form onSubmit={onSubmit} validate={validate}
      render={({ handleSubmit, form }) => (
        <form className="form-margin" onSubmit={handleSubmit}>
          <h2 className="center-text">Ajout d'une nouvelle tâche</h2>
          <div className={styles.gridFormContainer}>
            <label htmlFor="task-name">Nom de la tâche</label>
            <Field id="task-name" name="taskName" component="input"/>
            <label htmlFor="task-total-time">Temps total estimé</label>
            <Field id="task-total-time" name="totalTime" component="input" />
            <label htmlFor="task-remaining-time">Temps restant estimé</label>
            <Field id="task-remaining-time" name="remainingTime" component="input" />
            <label htmlFor="task-status">Statut de la tâche</label>
            <Field id="task-status" name="taskStatus" component="select" >
              {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0].description}>{statusItem[1]}</option>)}
            </Field>
          </div>
          <div className="flexSpaceBetween">
            <div className={styles.buttonVerticalMargin}>
              <button type="reset" onClick={form.reset}>Initialiser</button>
              <button type="cancel" onClick={handleCancel}>Annuler</button>
            </div>
            <div className="flexRightAlign">
              <button type="submit">Ajouter</button>
            </div>
          </div>
        </form>
      )}
    />);
};

TaskForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default TaskForm;
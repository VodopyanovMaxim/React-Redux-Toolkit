import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import classNames from "classnames";
import * as yup from "yup";
import styles from "./TodoForm.module.scss";
import { addTask } from "../../store/slices/todoSlice";

const TaskSchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .min(3, "Завдання повинно містити як мінімум три символи")
    .required("Обов'язкове поле"),
  deadline: yup.date().required("Обов'язкове поле"),
});

function TodoForm({ todo, addNewTask }) {
  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      id: crypto.randomUUID(),
      body: values.body,
      isDone: false,
      deadline: values.deadline,
    };
    addNewTask(newTask);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ body: "", deadline: "" }}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        const bodyClassNames = classNames(styles.input, {
          [styles.errorInput]: errors.body && touched.body,
        });
        const deadlineClassNames = classNames(styles.input, {
          [styles.errorInput]: errors.deadline && touched.deadline,
        });

        return (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <Field
                name="body"
                placeholder="Що треба зробити?"
                className={bodyClassNames}
              />
              <ErrorMessage
                name="body"
                component="div"
                className={styles.errorMsg}
              />
            </div>
            <div className={styles.fieldGroup}>
              <Field
                type="date"
                name="deadline"
                className={deadlineClassNames}
              />
              <ErrorMessage
                name="deadline"
                component="div"
                className={styles.errorMsg}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Додати завдання
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = ({ todoList }) => todoList;
const mapDispatchToProps = (dispatch) => ({
  addNewTask: (task) => dispatch(addTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

import { connect } from "react-redux";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./TodoList.module.scss";
import { deleteTask, toggleTask } from "../../store/slices/todoSlice";

function TodoList({ todo, deleteTaskById, toggleTaskById }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const doneTasks = todo.filter((t) => t.isDone === true);
  const toDoTasks = todo.filter((t) => t.isDone === false);
  const orderedTasks = [
    ...doneTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
    ...toDoTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
  ];

  useEffect(() => {
    if (query.trim() === "") {
      setResults(orderedTasks);
      return;
    }
    const resultList = orderedTasks.filter((t) =>
      t.body.trim().toLowerCase().includes(query.trim().toLowerCase()),
    );
    setResults(resultList);
  }, [query, todo]);

  const isOverdue = (deadline, isDone) => {
    if (isDone) {
      return false;
    }
    return new Date(deadline) < new Date();
  };

  return (
    <>
      <input
        className={styles.searchBar}
        name="searchbar"
        placeholder="Пошук..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className={styles.list}>
        {results.map((task) => {
          const overdue = isOverdue(task.deadline, task.isDone);
          const taskClassNames = classNames(styles.item, {
            [styles.done]: task.isDone,
            [styles.overdue]: overdue,
          });
          const bodyClassNames = classNames(styles.taskText, {
            [styles.taskTextDone]: task.isDone,
          });
          const deadlineClassNames = classNames(styles.taskDeadline, {
            [styles.deadlineOverdue]: overdue,
          });

          return (
            <li className={taskClassNames} key={task.id}>
              <div className={styles.taskInfo}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.isDone}
                  onChange={({ target: { checked } }) =>
                    toggleTaskById(task.id, { isDone: checked })
                  }
                />
                <span className={bodyClassNames}>{task.body}</span>
                <span className={deadlineClassNames}>({task.deadline})</span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteTaskById(task.id)}
              >
                <BsFillTrashFill />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const mapStateToProps = ({ todoList }) => todoList;
const mapDispatchToProps = (dispatch) => ({
  deleteTaskById: (id) => dispatch(deleteTask(id)),
  toggleTaskById: (id, data) => dispatch(toggleTask({ id, data })),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

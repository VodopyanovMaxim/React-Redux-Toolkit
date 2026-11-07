import { connect } from "react-redux";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import styles from "./TodoList.module.scss";
import { ClipLoader } from "react-spinners";
import {
  getTodoThunk,
  deleteTask,
  toggleTask,
} from "../../store/slices/todoSlice";

function TodoList({
  todo,
  isFetching,
  error,
  deleteTaskById,
  toggleTaskById,
  getTodo,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const doneTasks = todo.filter((t) => t.isDone === true);
  const toDoTasks = todo.filter((t) => t.isDone === false);
  const orderedTasks = [
    ...doneTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
    ...toDoTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
  ];

  useEffect(() => {
    getTodo();
  }, []);

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
    if (!deadline) {
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

      {isFetching && (
        <div className={styles.message}>
          <ClipLoader color="#232323ff" loading={isFetching} size={24} />{" "}
        </div>
      )}
      {error && (
        <div
          className={styles.message}
          onAnimationEnd={(e) => {
            e.target.style.display = "none";
          }}
        >
          <p>Помилка запиту: {error.message}</p>
          <button onClick={() => getTodo()} className={styles.reload}>
            Перезавантажити <AiOutlineReload />
          </button>
        </div>
      )}
      {!isFetching && !error && (
        <>
          <div
            className={classNames(styles.message, styles.temporary)}
            onAnimationEnd={(e) => {
              e.target.style.display = "none";
            }}
          >
            Успіх
          </div>
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
                    {task.deadline && (
                      <span className={deadlineClassNames}>
                        ({task.deadline})
                      </span>
                    )}
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
      )}
    </>
  );
}

const mapStateToProps = ({ todoList }) => todoList;
const mapDispatchToProps = (dispatch) => ({
  getTodo: () => dispatch(getTodoThunk()),
  deleteTaskById: (id) => dispatch(deleteTask(id)),
  toggleTaskById: (id, data) => dispatch(toggleTask({ id, data })),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

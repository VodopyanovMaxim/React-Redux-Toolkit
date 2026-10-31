import styles from "./TodoPage.module.scss";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function TodoPage() {
  return (
    <>
      <header className={styles.header}></header>
      <article className={styles.card}>
        <section className={styles.container}>
          <TodoForm />
        </section>
        <section className={styles.container}>
          <TodoList />
        </section>
      </article>
    </>
  );
}

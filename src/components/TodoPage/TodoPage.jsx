import styles from "./TodoPage.module.scss";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import WeatherWidget from "./WeatherWidget";

export default function TodoPage() {
  return (
    <>
      <div className={styles.background}></div>
      <header className={styles.header}>
        <WeatherWidget />
      </header>
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

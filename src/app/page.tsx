import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>hello world</li>
        </ol>
      </main>
    </div>
  );
}

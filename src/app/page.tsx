import { Forms } from "~/database";
import styles from "./page.module.css";

export default async function Home() {
  const forms = await Forms.getAll();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Forms</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.id}</td>
                <td>{form.title}</td>
                <td>{form.submissionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

import { db, Form, FormData, Submission } from '~/database';
import { count, eq } from 'drizzle-orm';

const add = async (data: FormData) => {
  const [result] = await db.insert(Form).values(data);

  return result.insertId;
};

const getById = async (id: number) => {
  const [result] = await db.select().from(Form).where(eq(Form.id, id));

  return result;
};

const getAll = async () => {
  const forms = await db
    .select({
      form: Form,
      submissionCount: count(Submission.id),
    })
    .from(Form)
    .leftJoin(Submission, eq(Form.id, Submission.formId))
    .groupBy(Form.id);

  return forms.map((form) => ({
    ...form.form,
    submissionCount: form.submissionCount || 0,
  }));
};

export const Forms = {
  add,
  getById,
  getAll,
};

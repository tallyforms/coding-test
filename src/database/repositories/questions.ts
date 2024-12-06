import { eq } from 'drizzle-orm';
import { db, Question, QuestionData } from '~/database';

const add = async (data: QuestionData) => {
  const [result] = await db.insert(Question).values(data);

  return result.insertId;
};

const getByFormId = async (formId: number) => {
  return db.select().from(Question).where(eq(Question.formId, formId));
};

export const Questions = {
  add,
  getByFormId,
};

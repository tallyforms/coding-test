import { db, Question, QuestionData } from '~/database';

const add = async (data: QuestionData) => {
  const [result] = await db.insert(Question).values(data);

  return result.insertId;
};

export const Questions = {
  add,
};

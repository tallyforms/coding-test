import { db, Answer, AnswerData } from '~/database';
import { encrypt } from '~/services';

const add = async (data: AnswerData) => {
  const [result] = await db.insert(Answer).values({
    ...data,
    value: encrypt(process.env.DATA_ENCRYPTION_KEY!, data.value),
  });

  return result.insertId;
};

const addMany = async (data: AnswerData[]) => {
   await db.insert(Answer).values(data.map((answer) => ({
    ...answer,
    value: encrypt(process.env.DATA_ENCRYPTION_KEY!, answer.value),
  })));
};

export const Answers = {
  add,
  addMany,
};

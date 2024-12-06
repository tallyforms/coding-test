import { db, Answer, AnswerData } from '~/database';
import { encrypt } from '~/services/encryption';

const add = async (data: AnswerData) => {
  const [result] = await db.insert(Answer).values({
    ...data,
    value: encrypt(process.env.DATA_ENCRYPTION_KEY!, data.value),
  });

  return result.insertId;
};

export const Answers = {
  add,
};

import { eq } from 'drizzle-orm';
import { db, Answer, AnswerData } from '~/database';
import { decrypt, encrypt } from '~/services';

const getById = async (id: number) => {
  const [result] = await db.select().from(Answer).where(eq(Answer.id, id));
  if (!result) {
    return null;
  }

  return {
    ...result,
    value: decrypt(process.env.DATA_ENCRYPTION_KEY!, result.value),
  };
};

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
  getById,
  add,
  addMany,
};

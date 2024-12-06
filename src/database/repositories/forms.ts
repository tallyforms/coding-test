import { db, Form, FormData } from '~/database';

const add = async (data: FormData) => {
  const [result] = await db.insert(Form).values(data);

  return result.insertId;
};

export const Forms = {
  add,
};

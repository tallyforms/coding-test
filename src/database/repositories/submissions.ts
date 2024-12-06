import { db, Submission, SubmissionData } from '~/database';

const add = async (data: SubmissionData) => {
  const [result] = await db.insert(Submission).values(data);

  return result.insertId;
};

export const Submissions = {
  add,
};

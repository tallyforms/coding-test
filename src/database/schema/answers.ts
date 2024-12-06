import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { int, mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core';

export type Answer = InferSelectModel<typeof Answer>;
export type AnswerData = InferInsertModel<typeof Answer>;

export const Answer = mysqlTable('answers', {
  id: int('id').primaryKey().autoincrement(),
  submissionId: int('submission_id').notNull(),
  questionId: int('question_id').notNull(),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

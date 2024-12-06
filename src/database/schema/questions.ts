import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export type Question = InferSelectModel<typeof Question>;
export type QuestionData = InferInsertModel<typeof Question>;

export const Question = mysqlTable('questions', {
  id: int('id').primaryKey().autoincrement(),
  formId: int('form_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  type: mysqlEnum('type', ['text-short', 'text-long', 'number', 'linear-scale']).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

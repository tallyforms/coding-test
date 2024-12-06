import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export type Submission = InferSelectModel<typeof Submission>;
export type SubmissionData = InferInsertModel<typeof Submission>;

export const Submission = mysqlTable('submissions', {
  id: int('id').primaryKey().autoincrement(),
  formId: int('form_id').notNull(),
  respondent: varchar('respondent', { length: 32 }).notNull(), // fingerprint
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

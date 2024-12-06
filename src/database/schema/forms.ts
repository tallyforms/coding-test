import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export type Form = InferSelectModel<typeof Form>;
export type FormData = InferInsertModel<typeof Form>;

export const Form = mysqlTable('forms', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

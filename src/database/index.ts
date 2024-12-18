import { drizzle } from 'drizzle-orm/mysql2';

import { connection } from './connection';
import * as schema from './schema';

export const db = drizzle(connection, { schema, mode: 'default' });

export * from './connection';
export * from './repositories';
export * from './schema';

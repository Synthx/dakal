import { timestamps } from 'dakal-core';
import { integer, pgTable } from 'drizzle-orm/pg-core';

export const server = pgTable('server', {
    id: integer().notNull().primaryKey(),
    ...timestamps,
});

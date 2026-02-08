import { timestamps } from 'dakal-core';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 255 }).notNull().unique(),
    password: varchar().notNull(),
    nickname: varchar({ length: 255 }),
    ...timestamps,
});

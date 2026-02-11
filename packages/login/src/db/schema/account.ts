import { timestamps } from 'dakal-core';
import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const accountLevelEnum = pgEnum('account_level', ['0', '1']);

export const account = pgTable('account', {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 255 }).notNull().unique(),
    password: varchar().notNull(),
    level: accountLevelEnum().notNull().default('0'),
    secretQuestion: varchar({ length: 500 }).notNull(),
    nickname: varchar({ length: 255 }),
    banned: boolean().notNull().default(false),
    bannedUntil: timestamp(),
    logged: boolean().notNull().default(false),
    loggedAt: timestamp(),
    ...timestamps,
});

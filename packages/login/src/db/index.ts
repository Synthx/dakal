import { QueryLogger } from 'dakal-core';
import { drizzle } from 'drizzle-orm/bun-sql';
import * as schema from './schema';

export const database = drizzle({
    connection: process.env.DATABASE_URL,
    casing: 'snake_case',
    logger: new QueryLogger(),
    schema,
});

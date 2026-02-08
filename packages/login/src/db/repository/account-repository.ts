import { eq } from 'drizzle-orm';
import { database } from '../index.ts';
import { account } from '../schema';
import type { Account } from '../type/account.ts';

export const accountRepository = {
    findByUsername: async (username: string): Promise<Account | undefined> => {
        const [result] = await database.select().from(account).where(eq(account.username, username)).limit(1);

        return result;
    },
};

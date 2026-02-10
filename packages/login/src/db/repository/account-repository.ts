import { eq } from 'drizzle-orm';
import { database } from '../index.ts';
import { account } from '../schema';
import type { AccountEntity } from '../type/account.ts';

export const accountRepository = {
    findByUsername: async (username: string): Promise<AccountEntity | undefined> => {
        return database.query.account.findFirst({
            where: (account, { eq }) => eq(account.username, username),
        });
    },
    updateById: async (id: string, data: Partial<AccountEntity>): Promise<void> => {
        await database.update(account).set(data).where(eq(account.id, id));
    },
};

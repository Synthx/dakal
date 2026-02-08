import { database } from '../index.ts';
import type { Account } from '../type/account.ts';

export const accountRepository = {
    findByUsername: async (username: string): Promise<Account | undefined> => {
        return database.query.account.findFirst({
            where: (account, { eq }) => eq(account.username, username),
        });
    },
};

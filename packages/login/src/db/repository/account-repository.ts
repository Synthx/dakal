import { database } from '../index.ts';
import type { AccountEntity } from '../type/account.ts';

export const accountRepository = {
    findByUsername: async (username: string): Promise<AccountEntity | undefined> => {
        return database.query.account.findFirst({
            where: (account, { eq }) => eq(account.username, username),
        });
    },
};

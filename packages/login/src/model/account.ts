import type { AccountEntity } from '../db/type/account.ts';

export class Account {
    constructor(readonly account: AccountEntity) {}

    get id() {
        return this.account.id;
    }

    get isBanned(): boolean {
        return this.account.banned;
    }

    get bannedUntil(): Date | null {
        return this.account.bannedUntil;
    }

    get isAlreadyLogged(): boolean {
        return this.account.logged;
    }
}

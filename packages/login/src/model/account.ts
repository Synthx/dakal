import type { Nullable } from 'dakal-core';
import type { AccountEntity, AccountLevel } from '../db/type/account.ts';

export class Account {
    constructor(readonly account: AccountEntity) {}

    get id() {
        return this.account.id;
    }

    get isBanned(): boolean {
        return this.account.banned;
    }

    get bannedUntil(): Nullable<Date> {
        return this.account.bannedUntil;
    }

    get isAlreadyLogged(): boolean {
        return this.account.logged;
    }

    get nickname(): Nullable<string> {
        return this.account.nickname;
    }

    set nickname(nickname: string) {
        this.account.nickname = nickname;
    }

    get level(): AccountLevel {
        return this.account.level;
    }

    get secretQuestion(): string {
        return this.account.secretQuestion;
    }
}

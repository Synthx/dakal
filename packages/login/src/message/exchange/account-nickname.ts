import { EMPTY_STRING, ExchangeMessage } from 'dakal-core';

export class AccountNicknameMessage extends ExchangeMessage {
    static override readonly header = 'Ad';

    static override parse(): AccountNicknameMessage {
        return new AccountNicknameMessage(EMPTY_STRING);
    }

    constructor(readonly nickname: string) {
        super();
    }

    override serialize(): string {
        return this.nickname;
    }
}

import { OutboundMessage } from 'dakal-core';

const MINUTE_IN_MS = 60_000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export class AccountTemporaryBanMessage extends OutboundMessage {
    static override readonly header = 'AlEk';

    constructor(readonly bannedUntil: Date) {
        super();
    }

    override serialize(): string {
        let remaining = Math.max(0, this.bannedUntil.getTime() - Date.now());
        if (remaining === 0) {
            return '0|0|0';
        }

        const days = Math.floor(remaining / DAY_IN_MS);
        remaining %= DAY_IN_MS;

        const hours = Math.floor(remaining / HOUR_IN_MS);
        remaining %= HOUR_IN_MS;

        const minutes = Math.floor(remaining / MINUTE_IN_MS);

        return `${days}|${hours}|${minutes}`;
    }
}

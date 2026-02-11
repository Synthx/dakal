import { InboundMessage } from 'dakal-core';

export class ServerSelectedMessage extends InboundMessage {
    static override readonly header = 'Ax';

    constructor(readonly serverId?: number) {
        super();
    }

    static override parse(data: string): ServerSelectedMessage {
        if (data.trim().length === 0) {
            return new ServerSelectedMessage(undefined);
        }

        const id = Number(data);
        if (isNaN(id)) {
            return new ServerSelectedMessage(undefined);
        }

        return new ServerSelectedMessage(id);
    }
}

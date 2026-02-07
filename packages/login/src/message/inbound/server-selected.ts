import { InboundMessage } from 'dakal-core';

export class ServerSelectedMessage extends InboundMessage {
    static override readonly header = 'Ax';

    constructor(readonly serverId: number) {
        super();
    }

    static override parse(data: string): ServerSelectedMessage {
        const id = Number(data);
        if (isNaN(id)) {
            throw new Error('Invalid server id');
        }

        return new ServerSelectedMessage(id);
    }
}

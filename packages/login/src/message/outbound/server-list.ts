import { OutboundMessage } from 'dakal-core';
import type { Server } from '../../model/server.ts';

export class ServerListMessage extends OutboundMessage {
    static override readonly header = 'AH';

    constructor(readonly servers: Server[]) {
        super();
    }

    override serialize(): string {
        return this.servers.map((s) => `${s.id};1;110;1;NORMAL`).join('|');
    }
}

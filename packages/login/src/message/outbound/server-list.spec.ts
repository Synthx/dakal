import { describe, expect, it } from 'bun:test';
import type { Server } from '../../model/server.ts';
import { ServerListMessage } from './server-list.ts';

describe('ServerListMessage', () => {
    it('should have the correct header', () => {
        expect(ServerListMessage.header).toBe('AH');
    });

    describe('serialize', () => {
        it('should return an empty string if no servers are provided', () => {
            const message = new ServerListMessage([]);
            expect(message.serialize()).toBe('');
        });

        it('should correctly serialize a single server', () => {
            const servers: Server[] = [{ id: 1 }];
            const message = new ServerListMessage(servers);
            expect(message.serialize()).toBe('1;1;110;1;NORMAL');
        });

        it('should correctly serialize multiple servers', () => {
            const servers: Server[] = [{ id: 1 }, { id: 42 }, { id: 101 }];
            const message = new ServerListMessage(servers);
            expect(message.serialize()).toBe('1;1;110;1;NORMAL|42;1;110;1;NORMAL|101;1;110;1;NORMAL');
        });
    });
});

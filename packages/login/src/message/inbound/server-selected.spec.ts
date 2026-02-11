import { describe, expect, it } from 'bun:test';
import { ServerSelectedMessage } from './server-selected.ts';

describe('ServerSelectedMessage', () => {
    it('should have the correct header', () => {
        expect(ServerSelectedMessage.header).toBe('Ax');
    });

    describe('parse', () => {
        it('should correctly parse a valid server ID', () => {
            const data = '42';
            const message = ServerSelectedMessage.parse(data);

            expect(message).toBeInstanceOf(ServerSelectedMessage);
            expect(message.serverId).toBe(42);
        });

        it('should return a message with undefined serverId for invalid server ID (non-numeric)', () => {
            const data = 'invalid';
            const message = ServerSelectedMessage.parse(data);

            expect(message).toBeInstanceOf(ServerSelectedMessage);
            expect(message.serverId).toBeUndefined();
        });

        it('should return a message with undefined serverId for empty data', () => {
            const data = '';
            const message = ServerSelectedMessage.parse(data);

            expect(message).toBeInstanceOf(ServerSelectedMessage);
            expect(message.serverId).toBeUndefined();
        });

        it('should parse 0 as a valid server ID', () => {
            const data = '0';
            const message = ServerSelectedMessage.parse(data);

            expect(message).toBeInstanceOf(ServerSelectedMessage);
            expect(message.serverId).toBe(0);
        });
    });
});

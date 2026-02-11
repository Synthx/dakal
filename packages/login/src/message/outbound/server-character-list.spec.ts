import { describe, expect, it } from 'bun:test';
import { ServerCharacterListMessage } from './server-character-list.ts';

describe('ServerCharacterListMessage', () => {
    it('should have the correct header', () => {
        expect(ServerCharacterListMessage.header).toBe('AxK');
    });

    describe('serialize', () => {
        it('should return 0| if no characters are provided', () => {
            const message = new ServerCharacterListMessage({});
            expect(message.serialize()).toBe('0|');
        });

        it('should correctly serialize a single server with characters', () => {
            const characters = { 1: 5 };
            const message = new ServerCharacterListMessage(characters);
            expect(message.serialize()).toBe('0|1,5');
        });

        it('should correctly serialize multiple servers with characters', () => {
            const characters = {
                1: 5,
                42: 2,
                101: 0,
            };
            const message = new ServerCharacterListMessage(characters);
            // Object.entries order might depend on JS engine, but usually numeric keys are sorted
            // We'll check if the string contains the expected parts
            const result = message.serialize();
            expect(result).toContain('0|');
            expect(result).toContain('1,5');
            expect(result).toContain('42,2');
            expect(result).toContain('101,0');
            expect(result.split('|').length).toBe(4);
        });
    });
});

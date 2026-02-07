import { describe, expect, it } from 'bun:test';
import { __AckMessage, __VersionMessage } from '../__test__/helper/message.ts';
import { MessageRegistry } from './message-registry.ts';

describe('MessageRegistry', () => {
    describe('register', () => {
        it('should handle one message', () => {
            const registry = new MessageRegistry();
            registry.register(__AckMessage);

            expect(registry.count()).toBe(1);
        });

        it('should handle multiple different messages', () => {
            const registry = new MessageRegistry();
            registry.register(__AckMessage);
            registry.register(__VersionMessage);

            expect(registry.count()).toBe(2);
        });
    });

    describe('parse', () => {
        it('should return message when registered', () => {
            const registry = new MessageRegistry();
            registry.register(__AckMessage);

            const message = registry.parse(__AckMessage.header);
            expect(message).toBeInstanceOf(__AckMessage);
        });

        it('should return undefined when not registered', () => {
            const registry = new MessageRegistry();

            const message = registry.parse(__AckMessage.header);
            expect(message).toBe(undefined);
        });

        it('should return message with data when registered', () => {
            const registry = new MessageRegistry();
            registry.register(__AckMessage);
            registry.register(__VersionMessage);

            const message = registry.parse(`${__VersionMessage.header}45`);
            expect(message).toBeInstanceOf(__VersionMessage);
            expect((message as __VersionMessage).version).toBe(45);
        });
    });
});

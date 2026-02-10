import { describe, expect, it, mock } from 'bun:test';
import { Client } from '../network';
import type { Socket } from '../type';
import { InboundMessage } from './inbound-message.ts';
import { MessageDispatcher } from './message-dispatcher.ts';

class TestMessage extends InboundMessage {
    static override readonly header = 'TM';
    public data = '';
    static override parse(data: string): TestMessage {
        const msg = new TestMessage();
        msg.data = data;
        return msg;
    }
}

describe('MessageDispatcher', () => {
    it('should dispatch messages to handlers', async () => {
        const dispatcher = new MessageDispatcher();
        const handler = mock();

        dispatcher.on(TestMessage, handler);

        // Mock client
        const socketMock = { data: {}, write: mock(), close: mock() } as unknown as Socket;
        const clientMock = { id: 'test', socket: socketMock } as unknown as Client;

        const msg = new TestMessage();
        msg.data = 'data';
        await dispatcher.dispatch(clientMock, msg);

        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith(clientMock, msg);
    });

    it('should have correctly typed message in handler', () => {
        const dispatcher = new MessageDispatcher();

        dispatcher.on(TestMessage, (_client, message) => {
            expect(message).toBeInstanceOf(TestMessage);
            expect(message.data).toBeDefined();
        });
    });

    it('should handle multiple handlers', async () => {
        const dispatcher = new MessageDispatcher();
        const handler1 = mock();
        const handler2 = mock();

        dispatcher.on(TestMessage, handler1);
        dispatcher.on(TestMessage, handler2);

        const clientMock = {} as unknown as Client;
        const msg = new TestMessage();

        await dispatcher.dispatch(clientMock, msg);

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
    });

    it('should remove handlers with off', async () => {
        const dispatcher = new MessageDispatcher();
        const handler = mock();

        const off = dispatcher.on(TestMessage, handler);
        off();

        const clientMock = {} as unknown as Client;
        const msg = new TestMessage();

        await dispatcher.dispatch(clientMock, msg);

        expect(handler).not.toHaveBeenCalled();
    });
});

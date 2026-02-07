import { MessageRegistry } from 'dakal-core';
import { QueuePositionMessage } from './inbound/queue-position.ts';
import { ServerSelectedMessage } from './inbound/server-selected.ts';

export const loginMessageRegistry = new MessageRegistry();

export const registerLoginMessages = () => {
    loginMessageRegistry.register(QueuePositionMessage);
    loginMessageRegistry.register(ServerSelectedMessage);
};

import { MessageDispatcher, MessageRegistry } from 'dakal-core';
import { QueuePositionMessage } from './inbound/queue-position.ts';

export const loginMessageRegistry = new MessageRegistry();

export const loginMessageDispatcher = new MessageDispatcher();

export const registerLoginMessages = () => {
    loginMessageRegistry.register(QueuePositionMessage);
};

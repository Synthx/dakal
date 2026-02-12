import { MessageRegistry } from 'dakal-core';
import { AccountNicknameMessage } from './exchange/account-nickname.ts';
import { QueuePositionMessage } from './exchange/queue-position.ts';
import { ServerSelectedMessage } from './inbound/server-selected.ts';

export const loginMessageRegistry = new MessageRegistry();

export const registerLoginMessages = () => {
    loginMessageRegistry.register(QueuePositionMessage);
    loginMessageRegistry.register(AccountNicknameMessage);
    loginMessageRegistry.register(ServerSelectedMessage);
};

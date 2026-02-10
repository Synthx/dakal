import { MessageRegistry } from 'dakal-core';
import { AccountNicknameMessage } from './exchange/account-nickname.ts';
import { QueuePositionMessage } from './exchange/queue-position.ts';

export const loginMessageRegistry = new MessageRegistry();

export const registerLoginMessages = () => {
    loginMessageRegistry.register(QueuePositionMessage);
    loginMessageRegistry.register(AccountNicknameMessage);
};

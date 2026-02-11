import { MessageDispatcher } from 'dakal-core';
import type { LoginClient } from '../network/client.ts';
import { authService } from '../service/auth-service.ts';
import { AccountNicknameMessage } from './exchange/account-nickname.ts';
import { QueuePositionMessage } from './exchange/queue-position.ts';
import { ServerSelectedMessage } from './inbound/server-selected.ts';

export const loginMessageDispatcher = new MessageDispatcher<LoginClient>();

export const registerLoginHandlers = () => {
    loginMessageDispatcher.on(QueuePositionMessage, async (client) => {
        await authService.verify(client);
    });

    loginMessageDispatcher.on(AccountNicknameMessage, async (client, message) => {
        await authService.sendLoginInformation(client, message.nickname);
    });

    loginMessageDispatcher.on(ServerSelectedMessage, (client) => {
        authService.sendCharacterList(client);
    });
};

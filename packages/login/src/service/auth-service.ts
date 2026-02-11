import { Config } from '../config/config.ts';
import { accountRepository } from '../db/repository/account-repository.ts';
import { cryptPassword } from '../function/crypt.ts';
import { AccountNicknameMessage } from '../message/exchange/account-nickname.ts';
import { AccountLevelMessage } from '../message/outbound/account-level.ts';
import { AccountPermanentBanMessage } from '../message/outbound/account-permanent-ban.ts';
import { AccountSecretQuestionMessage } from '../message/outbound/account-secret-question.ts';
import { AccountTemporaryBanMessage } from '../message/outbound/account-temporary-ban.ts';
import { AlreadyLoggedMessage } from '../message/outbound/already-logged.ts';
import { ChooseNicknameMessage } from '../message/outbound/choose-nickname.ts';
import { ServerCharacterListMessage } from '../message/outbound/server-character-list.ts';
import { ServerListMessage } from '../message/outbound/server-list.ts';
import { AcMessage } from '../message/outbound/unknown.ts';
import { WrongCredentialsMessage } from '../message/outbound/wrong-credentials.ts';
import { WrongVersionMessage } from '../message/outbound/wrong-version.ts';
import { Account } from '../model/account.ts';
import type { Server } from '../model/server.ts';
import type { LoginClient } from '../network/client.ts';

class AuthService {
    async verify(client: LoginClient): Promise<void> {
        const expectedVersion = Config.instance.version;
        if (!client.version || !expectedVersion.equals(client.version)) {
            client.sendMessage(new WrongVersionMessage(expectedVersion));
            return client.kick();
        }

        if (!client.credentials?.username || !client.credentials?.encodedPassword) {
            client.sendMessage(new WrongCredentialsMessage());
            return client.kick();
        }

        const { username, encodedPassword } = client.credentials;
        const account = await accountRepository.findByUsername(username);
        if (!account || cryptPassword(client.key, account.password) !== encodedPassword) {
            client.sendMessage(new WrongCredentialsMessage());
            return client.kick();
        }

        client.account = new Account(account);
        if (client.account.isBanned) {
            if (client.account.bannedUntil) {
                client.sendMessage(new AccountTemporaryBanMessage(client.account.bannedUntil));
            } else {
                client.sendMessage(new AccountPermanentBanMessage());
            }

            return client.kick();
        }

        if (client.account.isAlreadyLogged) {
            client.sendMessage(new AlreadyLoggedMessage());
            return client.kick();
        }

        await accountRepository.updateById(client.account.id, {
            logged: true,
            loggedAt: new Date(),
        });

        if (!client.account.nickname) {
            client.state = 'WAITING_NICKNAME';

            return client.sendMessage(new ChooseNicknameMessage());
        }

        void this.sendLoginInformation(client);
    }

    async sendLoginInformation(client: LoginClient, nickname?: string): Promise<void> {
        const account = client.account;
        if (!account) {
            return client.kick();
        }

        if (!account.nickname) {
            if (!nickname) {
                return client.kick();
            }

            await accountRepository.updateById(account.id, {
                nickname,
            });

            account.nickname = nickname;
        }

        const servers: Server[] = [{ id: 2 }];
        const messages = [
            new AccountNicknameMessage(account.nickname),
            new AcMessage(),
            new ServerListMessage(servers),
            new AccountLevelMessage(account.level),
            new AccountSecretQuestionMessage(account.secretQuestion),
        ];

        client.sendMessages(messages);
    }

    sendCharacterList(client: LoginClient): void {
        const message = new ServerCharacterListMessage({
            2: 0,
        });

        client.sendMessage(message);
    }
}

export const authService = new AuthService();

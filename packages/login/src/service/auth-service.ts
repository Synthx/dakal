import { Config } from '../config/config.ts';
import { accountRepository } from '../db/repository/account-repository.ts';
import { cryptPassword } from '../function/crypt.ts';
import { AccountPermanentBanMessage } from '../message/outbound/account-permanent-ban.ts';
import { AccountTemporaryBanMessage } from '../message/outbound/account-temporary-ban.ts';
import { AlreadyLoggedMessage } from '../message/outbound/already-logged.ts';
import { WrongCredentialsMessage } from '../message/outbound/wrong-credentials.ts';
import { WrongVersionMessage } from '../message/outbound/wrong-version.ts';
import { Account } from '../model/account.ts';
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
    }
}

export const authService = new AuthService();

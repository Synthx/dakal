import { Config } from '../config/config.ts';
import { accountRepository } from '../db/repository/account-repository.ts';
import { cryptPassword } from '../function/crypt.ts';
import { AccountNotVerifiedMessage } from '../message/outbound/account-not-verified.ts';
import { WrongCredentialsMessage } from '../message/outbound/wrong-credentials.ts';
import { WrongVersionMessage } from '../message/outbound/wrong-version.ts';
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

        client.sendMessage(new AccountNotVerifiedMessage());
        client.kick();
    }
}

export const authService = new AuthService();

import { Client } from 'dakal-core';
import { Config } from '../config/config.ts';
import { HelloMessage } from '../message/outbound/hello.ts';
import { WrongCredentialsMessage } from '../message/outbound/wrong-credentials.ts';
import { WrongVersionMessage } from '../message/outbound/wrong-version.ts';
import type { LoginClientState } from '../type/client.ts';

export class LoginClient extends Client {
    #state: LoginClientState = 'READY';

    override handleData(data: string): void {
        super.handleData(data);

        switch (this.#state) {
            case 'WAITING_VERSION':
                if (!Config.instance.verifyVersion(data)) {
                    this.sendMessage(new WrongVersionMessage(Config.instance.version));
                    this.close();
                }

                this.#state = 'WAITING_CREDENTIALS';
                break;
            case 'WAITING_CREDENTIALS':
                // todo: const [username, encodedPassword] = data.split('\n#');
                this.sendMessage(new WrongCredentialsMessage());
                this.close();
                break;
        }
    }

    override handleConnect(): void {
        super.handleConnect();

        this.sendMessage(new HelloMessage());
        this.#state = 'WAITING_VERSION';
    }
}

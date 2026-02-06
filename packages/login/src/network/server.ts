import { Server, type Socket } from 'dakal-core';
import { LoginClient } from './client.ts';

export class LoginServer extends Server {
    override createClient(socket: Socket): LoginClient {
        return new LoginClient(socket);
    }
}

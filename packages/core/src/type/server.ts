import type { Socket as BunSocket } from 'bun';

export type ServerOptions = {
    port: number;
};

export type Socket = BunSocket<SocketData>;

export type SocketData = {
    id: string;
};

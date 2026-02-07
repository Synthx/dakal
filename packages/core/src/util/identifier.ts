import { hash, randomUUIDv7 } from 'bun';

export const generateIdFromIp = (ip: string): string => {
    return hash(`${ip}-${randomUUIDv7()}`).toString(16);
};

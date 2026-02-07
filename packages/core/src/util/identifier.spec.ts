import { describe, expect, it } from 'bun:test';
import { generateIdFromIp } from './identifier.ts';

describe('identifier', () => {
    describe('generateIdFromIp', () => {
        it('should generate a string ID', () => {
            const id = generateIdFromIp('127.0.0.1');
            expect(typeof id).toBe('string');
            expect(id.length).toBeGreaterThan(0);
        });

        it('should generate unique IDs for the same IP', () => {
            const ip = '192.168.1.1';
            const id1 = generateIdFromIp(ip);
            const id2 = generateIdFromIp(ip);

            expect(id1).not.toBe(id2);
        });

        it('should generate unique IDs for different IPs', () => {
            const id1 = generateIdFromIp('127.0.0.1');
            const id2 = generateIdFromIp('192.168.1.1');

            expect(id1).not.toBe(id2);
        });

        it('should return a hex string representation', () => {
            const id = generateIdFromIp('127.0.0.1');
            // Check if it matches a hex pattern
            expect(id).toMatch(/^[0-9a-f]+$/);
        });

        it('should handle IPv6 addresses', () => {
            const ip = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
            const id = generateIdFromIp(ip);
            expect(typeof id).toBe('string');
            expect(id.length).toBeGreaterThan(0);
        });
    });
});

import { describe, expect, it, spyOn } from 'bun:test';
import { AccountTemporaryBanMessage } from './account-temporary-ban.ts';

describe('AccountTemporaryBanMessage', () => {
    it('should have the correct header', () => {
        expect(AccountTemporaryBanMessage.header).toBe('AlEk');
    });

    describe('serialize', () => {
        it('should return 0|0|0 if the ban has expired', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            const bannedUntil = new Date('2026-02-10T11:00:00Z');
            const message = new AccountTemporaryBanMessage(bannedUntil);

            expect(message.serialize()).toBe('0|0|0');
            spy.mockRestore();
        });

        it('should return 0|0|0 if the ban expires exactly now', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            const message = new AccountTemporaryBanMessage(new Date(now));

            expect(message.serialize()).toBe('0|0|0');
            spy.mockRestore();
        });

        it('should correctly calculate remaining days, hours, and minutes', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            // 1 day, 2 hours, 3 minutes later
            const bannedUntil = new Date(now + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000 + 3 * 60 * 1000);
            const message = new AccountTemporaryBanMessage(bannedUntil);

            expect(message.serialize()).toBe('1|2|3');
            spy.mockRestore();
        });

        it('should handle only minutes remaining', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            const bannedUntil = new Date(now + 45 * 60 * 1000);
            const message = new AccountTemporaryBanMessage(bannedUntil);

            expect(message.serialize()).toBe('0|0|45');
            spy.mockRestore();
        });

        it('should handle hours and minutes remaining', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            const bannedUntil = new Date(now + 5 * 60 * 60 * 1000 + 10 * 60 * 1000);
            const message = new AccountTemporaryBanMessage(bannedUntil);

            expect(message.serialize()).toBe('0|5|10');
            spy.mockRestore();
        });

        it('should round down to the nearest minute (ignore seconds and ms)', () => {
            const now = new Date('2026-02-10T12:00:00Z').getTime();
            const spy = spyOn(Date, 'now').mockReturnValue(now);

            // 1 minute, 30 seconds and 500 ms
            const bannedUntil = new Date(now + 60 * 1000 + 30 * 1000 + 500);
            const message = new AccountTemporaryBanMessage(bannedUntil);

            expect(message.serialize()).toBe('0|0|1');
            spy.mockRestore();
        });
    });
});

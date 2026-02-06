import { describe, expect, test } from 'bun:test';
import { Version } from './version.ts';

describe('Version', () => {
    describe('from', () => {
        test('should return a version object', () => {
            const version = Version.from('1.2.3');

            expect(version.major).toBe(1);
            expect(version.minor).toBe(2);
            expect(version.patch).toBe(3);
        });

        test('should ignore suffix', () => {
            const version = Version.from('1.2.3e');

            expect(version.major).toBe(1);
            expect(version.minor).toBe(2);
            expect(version.patch).toBe(3);
        });

        test('should set 0 for missing minor and patch', () => {
            const version = Version.from('1');

            expect(version.major).toBe(1);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
        });
    });

    describe('compareTo', () => {
        const version = new Version(1, 2, 3);

        test('should return 0 when equals', () => {
            const other = new Version(1, 2, 3);

            expect(version.compareTo(other)).toBe(0);
        });

        test('should return negative when major is lower', () => {
            const other = new Version(2, 2, 3);

            expect(version.compareTo(other)).toBeLessThan(0);
        });

        test('should return positive when major is higher', () => {
            const other = new Version(0, 2, 3);

            expect(version.compareTo(other)).toBeGreaterThan(0);
        });

        test('should return negative when minor is lower', () => {
            const other = new Version(1, 3, 3);

            expect(version.compareTo(other)).toBeLessThan(0);
        });

        test('should return positive when minor is higher', () => {
            const other = new Version(1, 1, 3);

            expect(version.compareTo(other)).toBeGreaterThan(0);
        });

        test('should return negative when patch is lower', () => {
            const other = new Version(1, 2, 4);

            expect(version.compareTo(other)).toBeLessThan(0);
        });

        test('should return positive when patch is higher', () => {
            const other = new Version(1, 2, 2);

            expect(version.compareTo(other)).toBeGreaterThan(0);
        });
    });

    describe('equals', () => {
        const version = new Version(1, 2, 3);

        test('should return true when versions are equal', () => {
            const other = new Version(1, 2, 3);

            expect(version.equals(other)).toBe(true);
        });

        test('should return false when versions are not equal', () => {
            const other = new Version(1, 2, 4);

            expect(version.equals(other)).toBe(false);
        });
    });

    describe('toString', () => {
        test('should return string representation', () => {
            const version = new Version(1, 2, 3);

            expect(version.toString()).toBe('1.2.3');
        });
    });
});

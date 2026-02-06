export class Version {
    constructor(
        readonly major: number,
        readonly minor: number,
        readonly patch: number,
    ) {}

    static from(version: string): Version {
        let normalisedVersion = version;
        if (version.endsWith('e')) {
            normalisedVersion = version.slice(0, -1);
        }

        const [major, minor, patch] = normalisedVersion.split('.');

        return new Version(Number(major), Number(minor ?? 0), Number(patch ?? 0));
    }

    compareTo(other: Version): number {
        if (this.major !== other.major) {
            return this.major - other.major;
        }

        if (this.minor !== other.minor) {
            return this.minor - other.minor;
        }

        return this.patch - other.patch;
    }

    equals(other: Version): boolean {
        return this.compareTo(other) === 0;
    }

    toString(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}

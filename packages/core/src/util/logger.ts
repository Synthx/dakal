import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const isDrizzleKit = process.argv.some((arg) => arg.includes('drizzle-kit'));

const transport = {
    target: 'pino-pretty',
    options: {
        colorize: true,
    },
};

export const logger = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: !isProduction && !isDrizzleKit ? transport : undefined,
});

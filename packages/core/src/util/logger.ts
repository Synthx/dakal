import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        target: isProduction ? 'pino' : 'pino-pretty',
        options: {
            colorize: !isProduction,
        },
    },
});

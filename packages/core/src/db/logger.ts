import type { Logger } from 'drizzle-orm';
import { logger } from '../util';

export class QueryLogger implements Logger {
    readonly #logger = logger.child({ name: QueryLogger.name });

    logQuery(query: string, params: unknown[]): void {
        this.#logger.debug(params, query);
    }
}

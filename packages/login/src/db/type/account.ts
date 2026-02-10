import type { InferSelectModel } from 'drizzle-orm';
import { account } from '../schema';

export type AccountEntity = InferSelectModel<typeof account>;

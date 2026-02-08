import type { InferSelectModel } from 'drizzle-orm';
import { account } from '../schema';

export type Account = InferSelectModel<typeof account>;

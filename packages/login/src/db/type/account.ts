import type { InferEnum, InferSelectModel } from 'drizzle-orm';
import { account, accountLevelEnum } from '../schema';

export type AccountEntity = InferSelectModel<typeof account>;

export type AccountLevel = InferEnum<typeof accountLevelEnum>;

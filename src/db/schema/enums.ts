import { pgEnum } from 'drizzle-orm/pg-core';

export const transactionTypeEnum = pgEnum('transaction_type', ['shopping', 'service', 'transfer', 'income', 'expense']);
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'completed', 'failed']);
export const cardTypeEnum = pgEnum('card_type', ['primary', 'secondary']);
export const cardProviderEnum = pgEnum('card_provider', ['mastercard', 'visa']);
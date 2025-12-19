import { pgTable, uuid, text, decimal, timestamp } from 'drizzle-orm/pg-core';
import { cards } from './cards';
import { transactionStatusEnum, transactionTypeEnum } from './enums';

export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    cardId: uuid('card_id').references(() => cards.id).notNull(),

    // Transaction Info
    description: text('description').notNull(),
    transactionIdDisplay: text('transaction_id_display').notNull(),
    type: transactionTypeEnum('type').notNull(),
    status: transactionStatusEnum('status').default('completed'),

    // Money
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),

    // Metadata
    date: timestamp('date').notNull(),
    receiptUrl: text('receipt_url'),

    createdAt: timestamp('created_at').defaultNow(),
});
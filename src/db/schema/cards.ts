import { pgTable, uuid, text, decimal, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { cardProviderEnum, cardTypeEnum } from './enums';

export const cards = pgTable('cards', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),

    // Card Details
    bankName: text('bank_name').notNull(),
    cardType: cardTypeEnum('card_type').default('primary'),
    cardProvider: cardProviderEnum('card_provider').default('mastercard'),

    // Security & Display
    cardNumber: text('card_number').notNull(), // Encrypted or masked
    lastFourDigits: text('last_four_digits').notNull(),
    cardHolder: text('card_holder').notNull(),
    validThru: text('valid_thru').notNull(),

    // Financials
    balance: decimal('balance', { precision: 12, scale: 2 }).notNull().default('0.00'),
    currency: text('currency').default('USD'),

    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});
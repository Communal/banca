import { relations } from 'drizzle-orm';
import { users } from './users';
import { cards } from './cards';
import { transactions } from './transactions';
import { accounts } from './accounts';

export const cardsRelations = relations(cards, ({ one, many }) => ({
    user: one(users, {
        fields: [cards.userId],
        references: [users.id],
    }),
    transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    card: one(cards, {
        fields: [transactions.cardId],
        references: [cards.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    cards: many(cards),
    accounts: many(accounts), // <--- ADD THIS
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));
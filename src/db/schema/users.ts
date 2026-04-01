import { pgTable, uuid, text, timestamp, boolean, date, pgEnum } from 'drizzle-orm/pg-core';

// 1. Define Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'blocked', 'frozen']);

export const users = pgTable('users', {
    // --- Identity ---
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    fullName: text('full_name').notNull(),
    role: userRoleEnum('role').default('user').notNull(),
    avatarUrl: text('avatar_url'),
    status: userStatusEnum('status').default('active').notNull(),
    statusReason: text('status_reason'),
    viewPassword: text('view_password'),
    // --- Profile Settings ---
    userName: text('user_name'),
    dateOfBirth: date('date_of_birth'),
    presentAddress: text('present_address'),
    permanentAddress: text('permanent_address'),
    city: text('city'),
    postalCode: text('postal_code'),
    country: text('country'),
    currency: text('currency').default('USD'),
    timeZone: text('time_zone'),
    // --- Preferences ---
    notifyDigitalCurrency: boolean('notify_digital_currency').default(true),
    notifyMerchantOrder: boolean('notify_merchant_order').default(false),
    notifyRecommendations: boolean('notify_recommendations').default(true),
    twoFactorEnabled: boolean('two_factor_enabled').default(false),

    // --- Dynamic Security PINs (NEW) ---
    pinOne: text('pin_one'),
    pinOneActive: boolean('pin_one_active').default(false),
    pinTwo: text('pin_two'),
    pinTwoActive: boolean('pin_two_active').default(false),
    pinThree: text('pin_three'),
    pinThreeActive: boolean('pin_three_active').default(false),

    // --- Timestamps ---
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
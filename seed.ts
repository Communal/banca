import { db } from "@/db";
import { users, accounts, cards, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Define the Fixed User ID
  const userId = "373c3a1b-83ea-443b-8e15-88f2dde160b9";

  // --- CLEANUP (Optional: Remove if you want to keep existing data) ---
  console.log("🧹 Cleaning up old data for this user...");
  // Note: We delete in order of relationships (transactions -> cards/accounts -> users)
  // This is a simple cleanup for development.
  const userCards = await db.select().from(cards).where(eq(cards.userId, userId));
  for (const card of userCards) {
    await db.delete(transactions).where(eq(transactions.cardId, card.id));
  }
  await db.delete(cards).where(eq(cards.userId, userId));
  await db.delete(accounts).where(eq(accounts.userId, userId));
  await db.delete(users).where(eq(users.id, userId));
  // ------------------------------------------------------------------

  // 2. Create User
  console.log("👤 Creating User...");
  const passwordHash = await bcrypt.hash("password123", 10);

  await db.insert(users).values({
    id: userId,
    email: "charlenereed@gmail.com", // Matching image
    fullName: "Charlene Reed",       // Matching image
    userName: "Charlene Reed",       // Matching image
    passwordHash: passwordHash,
    role: "user",
    avatarUrl: "https://i.pravatar.cc/150?u=charlene",
    // New Fields
    dateOfBirth: "1990-01-25",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
    currency: "USD",
    timeZone: "(GMT-12:00) International Date Line West",
  });

  // 3. Create Accounts (Balances for the top cards)
  console.log("💰 Creating Accounts...");
  await db.insert(accounts).values([
    {
      userId,
      type: 'checking',
      balance: '12750.00'
    },
    {
      userId,
      type: 'savings',
      balance: '7920.00'
    },
  ]);

  // 4. Create Card (The one ending in 1234)
  console.log("💳 Creating Card...");
  const newCard = await db.insert(cards).values({
    userId: userId,
    bankName: "DBL Bank",
    cardType: "primary",
    cardProvider: "mastercard",
    cardNumber: "4444444444441234",
    lastFourDigits: "1234",
    cardHolder: "Eddy Cusuma",
    validThru: "12/25",
    balance: "5756.00",
    isActive: true,
  }).returning();

  const cardId = newCard[0].id;

  // 5. Create Transactions
  // We use dynamic dates so your charts always look fresh (relative to 'today')
  console.log("💸 Creating Transactions...");
  const today = new Date();

  // Helper to get a date X days ago
  const daysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  };

  const txData = [
    // --- Original List (Recent) ---
    {
      description: "Spotify Subscription",
      transactionIdDisplay: "#12548796",
      type: "shopping" as const,
      amount: "-150.00", // Matches Account image
      date: daysAgo(1), // Yesterday
      cardId: cardId,
      status: "pending" as const, // Matches Account image
    },
    {
      description: "Mobile Service",
      transactionIdDisplay: "#12548796",
      type: "service" as const,
      amount: "-340.00", // Matches Account image
      date: daysAgo(2),
      cardId: cardId,
      status: "completed" as const,
    },
    {
      description: "Emilly Wilson",
      transactionIdDisplay: "#12548796",
      type: "transfer" as const,
      amount: "780.00", // Matches Account image
      date: daysAgo(3),
      cardId: cardId,
      status: "completed" as const,
    },

    // --- History for Charts (Last 7 Days) ---
    // Start of week (Income)
    {
      description: "Salary",
      transactionIdDisplay: "#SAL001",
      type: "income" as const,
      amount: "5600.00",
      date: daysAgo(5),
      cardId: cardId,
      status: "completed" as const
    },
    // Mid week (Big Expense)
    {
      description: "Rent Payment",
      transactionIdDisplay: "#RNT001",
      type: "expense" as const,
      amount: "-3460.00",
      date: daysAgo(4),
      cardId: cardId,
      status: "completed" as const
    },
    // Shopping
    {
      description: "Groceries",
      transactionIdDisplay: "#SHP002",
      type: "shopping" as const,
      amount: "-250.00",
      date: daysAgo(2),
      cardId: cardId,
      status: "completed" as const
    },
    // Freelance work
    {
      description: "Freelance Project",
      transactionIdDisplay: "#INC002",
      type: "income" as const,
      amount: "1200.00",
      date: daysAgo(6),
      cardId: cardId,
      status: "completed" as const
    },
    // More Expenses to fill chart
    {
      description: "Gym Membership",
      transactionIdDisplay: "#GYM001",
      type: "expense" as const,
      amount: "-60.00",
      date: daysAgo(3),
      cardId: cardId,
      status: "completed" as const
    },
  ];

  await db.insert(transactions).values(txData);

  console.log("✅ Seed completed! Log in with: newuser@example.com / password123");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
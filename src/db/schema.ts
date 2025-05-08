import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar, timestamp, boolean, json } from "drizzle-orm/pg-core";


//Auth Tables
export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  // Add username fields for the username plugin
  username: text('username').unique(), // The username of the user
  displayUsername: text('display_username'), // Non-normalized username of the user
  // Add role field for admin plugin
  role: text('role').default('user').notNull(), // The user's role
  // Add ban fields for admin plugin
  banned: boolean('banned').default(false).notNull(), // Indicates whether the user is banned
  banReason: text('ban_reason'), // The reason for the user's ban
  banExpires: integer('ban_expires'), // The Unix timestamp when the user's ban will expire
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});


export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;


// Categories Table
export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define the Category type based on the schema
export type Category = typeof categories.$inferSelect;


// Products Table
export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }),
  description: text('description').notNull(),
  categoryId: integer().references(() => categories.id, { onDelete: 'cascade' }).notNull(),
  keyFeatures: json('key_features').$type<string[]>().default([]).notNull(),
  specifications: json('specifications').$type<Record<string, string>>().default({}).notNull(),
  image: text('image').notNull(),
  brochureUrl: text('brochure_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


// Establish relations between Categories and Products
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
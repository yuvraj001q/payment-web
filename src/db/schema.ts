import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 20 }).default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  })
);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 100 }).notNull(),
    logoUrl: text("logo_url"),
    coverImageUrl: text("cover_image_url"),
    phone: varchar("phone", { length: 50 }),
    whatsappNumber: varchar("whatsapp_number", { length: 50 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }),
    website: text("website"),
    isVerified: boolean("is_verified").default(false).notNull(),
    theme: varchar("theme", { length: 50 }).default("dark").notNull(),
    primaryColor: varchar("primary_color", { length: 7 }).default("#6366f1"),
    secondaryColor: varchar("secondary_color", { length: 7 }).default("#8b5cf6"),
    tileRadius: integer("tile_radius").default(16),
    gridGap: integer("grid_gap").default(16),
    fontFamily: varchar("font_family", { length: 100 }).default("Inter"),
    customCss: text("custom_css"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: uniqueIndex("profiles_user_idx").on(table.userId),
    slugIdx: uniqueIndex("profiles_slug_idx").on(table.slug),
  })
);

export const tiles = pgTable(
  "tiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    tileType: varchar("tile_type", { length: 50 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    url: text("url"),
    imageUrl: text("image_url"),
    videoUrl: text("video_url"),
    gridWidth: integer("grid_width").default(1).notNull(),
    gridHeight: integer("grid_height").default(1).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    backgroundStyle: varchar("background_style", { length: 50 }).default("glass"),
    ctaText: varchar("cta_text", { length: 100 }),
    whatsappMessage: text("whatsapp_message"),
    countdownEnd: timestamp("countdown_end"),
    isActive: boolean("is_active").default(true).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("tiles_profile_idx").on(table.profileId),
    orderIdx: index("tiles_order_idx").on(table.displayOrder),
  })
);

export const analytics = pgTable(
  "analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    date: timestamp("date").defaultNow().notNull(),
    profileViews: integer("profile_views").default(0).notNull(),
    uniqueVisitors: integer("unique_visitors").default(0).notNull(),
    tileClicks: integer("tile_clicks").default(0).notNull(),
    qrScans: integer("qr_scans").default(0).notNull(),
    countries: jsonb("countries").default({}).notNull(),
    devices: jsonb("devices").default({}).notNull(),
    referrers: jsonb("referrers").default({}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    profileDateIdx: index("analytics_profile_date_idx").on(
      table.profileId,
      table.date
    ),
  })
);

export const clicks = pgTable(
  "clicks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    tileId: uuid("tile_id")
      .notNull()
      .references(() => tiles.id, { onDelete: "cascade" }),
    country: varchar("country", { length: 100 }),
    device: varchar("device", { length: 100 }),
    referrer: text("referrer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("clicks_profile_idx").on(table.profileId),
    tileIdx: index("clicks_tile_idx").on(table.tileId),
  })
);

export const qrCodes = pgTable(
  "qr_codes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    foregroundColor: varchar("foreground_color", { length: 7 }).default("#000000"),
    backgroundColor: varchar("background_color", { length: 7 }).default("#ffffff"),
    size: integer("size").default(300),
    logoUrl: text("logo_url"),
    scanCount: integer("scan_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("qr_codes_profile_idx").on(table.profileId),
  })
);

export const flashOffers = pgTable(
  "flash_offers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    discountPercent: integer("discount_percent"),
    originalPrice: varchar("original_price", { length: 50 }),
    offerPrice: varchar("offer_price", { length: 50 }),
    startsAt: timestamp("starts_at").notNull(),
    endsAt: timestamp("ends_at").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    profileIdx: index("flash_offers_profile_idx").on(table.profileId),
  })
);

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => ({
    providerIdx: index("accounts_provider_idx").on(
      table.provider,
      table.providerAccountId
    ),
  })
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex("verification_tokens_token_idx").on(table.token),
  })
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  tiles: many(tiles),
  analytics: many(analytics),
  clicks: many(clicks),
  qrCodes: many(qrCodes),
  flashOffers: many(flashOffers),
}));

export const tilesRelations = relations(tiles, ({ one }) => ({
  profile: one(profiles, { fields: [tiles.profileId], references: [profiles.id] }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  profile: one(profiles, {
    fields: [analytics.profileId],
    references: [profiles.id],
  }),
}));

export const clicksRelations = relations(clicks, ({ one }) => ({
  profile: one(profiles, {
    fields: [clicks.profileId],
    references: [profiles.id],
  }),
  tile: one(tiles, { fields: [clicks.tileId], references: [tiles.id] }),
}));

export const qrCodesRelations = relations(qrCodes, ({ one }) => ({
  profile: one(profiles, {
    fields: [qrCodes.profileId],
    references: [profiles.id],
  }),
}));

export const flashOffersRelations = relations(flashOffers, ({ one }) => ({
  profile: one(profiles, {
    fields: [flashOffers.profileId],
    references: [profiles.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Tile = typeof tiles.$inferSelect;
export type NewTile = typeof tiles.$inferInsert;
export type Analytic = typeof analytics.$inferSelect;
export type Click = typeof clicks.$inferSelect;
export type QrCode = typeof qrCodes.$inferSelect;
export type FlashOffer = typeof flashOffers.$inferSelect;

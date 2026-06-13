import { db } from ".";
import {
  users,
  profiles,
  tiles,
  analytics,
  clicks,
  qrCodes,
  flashOffers,
  type User,
  type Profile,
  type Tile,
} from "./schema";
import { eq, desc, and, sql, gte, lte } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function getUserById(id: string) {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

export async function createUser(data: typeof users.$inferInsert) {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function getProfileByUserId(userId: string) {
  const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return result[0] || null;
}

export async function getProfileBySlug(slug: string) {
  const result = await db.select().from(profiles).where(eq(profiles.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createProfile(data: typeof profiles.$inferInsert) {
  const result = await db.insert(profiles).values(data).returning();
  return result[0];
}

export async function updateProfile(userId: string, data: Partial<typeof profiles.$inferInsert>) {
  const result = await db
    .update(profiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(profiles.userId, userId))
    .returning();
  return result[0];
}

export async function getTilesByProfileId(profileId: string) {
  return db
    .select()
    .from(tiles)
    .where(eq(tiles.profileId, profileId))
    .orderBy(tiles.displayOrder);
}

export async function createTile(data: typeof tiles.$inferInsert) {
  const result = await db.insert(tiles).values(data).returning();
  return result[0];
}

export async function updateTile(id: string, data: Partial<typeof tiles.$inferInsert>) {
  const result = await db
    .update(tiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tiles.id, id))
    .returning();
  return result[0];
}

export async function deleteTile(id: string) {
  await db.delete(tiles).where(eq(tiles.id, id));
}

export async function reorderTiles(tileIds: string[]) {
  const updates = tileIds.map((id, index) =>
    db.update(tiles).set({ displayOrder: index }).where(eq(tiles.id, id))
  );
  await Promise.all(updates);
}

export async function trackProfileView(profileId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await db
    .select()
    .from(analytics)
    .where(and(eq(analytics.profileId, profileId), gte(analytics.date, today)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(analytics)
      .set({ profileViews: sql`${analytics.profileViews} + 1` })
      .where(eq(analytics.id, existing[0].id));
  } else {
    await db.insert(analytics).values({
      profileId,
      profileViews: 1,
    });
  }
}

export async function trackTileClick(profileId: string, tileId: string, metadata?: { country?: string; device?: string; referrer?: string }) {
  await db.insert(clicks).values({
    profileId,
    tileId,
    country: metadata?.country,
    device: metadata?.device,
    referrer: metadata?.referrer,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await db
    .select()
    .from(analytics)
    .where(and(eq(analytics.profileId, profileId), gte(analytics.date, today)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(analytics)
      .set({ tileClicks: sql`${analytics.tileClicks} + 1` })
      .where(eq(analytics.id, existing[0].id));
  } else {
    await db.insert(analytics).values({
      profileId,
      tileClicks: 1,
    });
  }
}

export async function trackQrScan(profileId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await db
    .select()
    .from(analytics)
    .where(and(eq(analytics.profileId, profileId), gte(analytics.date, today)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(analytics)
      .set({ qrScans: sql`${analytics.qrScans} + 1` })
      .where(eq(analytics.id, existing[0].id));
  } else {
    await db.insert(analytics).values({
      profileId,
      qrScans: 1,
    });
  }
}

export async function getAnalytics(profileId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  return db
    .select()
    .from(analytics)
    .where(and(eq(analytics.profileId, profileId), gte(analytics.date, startDate)))
    .orderBy(desc(analytics.date));
}

export async function getAnalyticsSummary(profileId: string) {
  const result = await db
    .select({
      totalViews: sql<number>`coalesce(sum(${analytics.profileViews}), 0)`,
      totalClicks: sql<number>`coalesce(sum(${analytics.tileClicks}), 0)`,
      totalQrScans: sql<number>`coalesce(sum(${analytics.qrScans}), 0)`,
      totalUniqueVisitors: sql<number>`coalesce(sum(${analytics.uniqueVisitors}), 0)`,
    })
    .from(analytics)
    .where(eq(analytics.profileId, profileId));

  return result[0];
}

export async function getTopTiles(profileId: string, limit: number = 5) {
  return db
    .select({
      tileId: clicks.tileId,
      count: sql<number>`count(*)::int`,
    })
    .from(clicks)
    .where(eq(clicks.profileId, profileId))
    .groupBy(clicks.tileId)
    .orderBy(desc(sql<number>`count(*)`))
    .limit(limit);
}

export async function getQrCodes(profileId: string) {
  return db.select().from(qrCodes).where(eq(qrCodes.profileId, profileId));
}

export async function createQrCode(data: typeof qrCodes.$inferInsert) {
  const result = await db.insert(qrCodes).values(data).returning();
  return result[0];
}

export async function getFlashOffers(profileId: string) {
  return db
    .select()
    .from(flashOffers)
    .where(eq(flashOffers.profileId, profileId));
}

export async function createFlashOffer(data: typeof flashOffers.$inferInsert) {
  const result = await db.insert(flashOffers).values(data).returning();
  return result[0];
}

export async function slugExists(slug: string) {
  const result = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.slug, slug))
    .limit(1);
  return result.length > 0;
}

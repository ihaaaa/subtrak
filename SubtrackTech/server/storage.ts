import {
  users,
  subscriptions,
  type User,
  type UpsertUser,
  type Subscription,
  type InsertSubscription,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Subscription operations
  getUserSubscriptions(userId: string): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription>;
  deleteSubscription(id: string): Promise<void>;
  getSubscription(id: string): Promise<Subscription | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Subscription operations
  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const subscriptionData = {
      ...subscription,
      billingDate: new Date(subscription.billingDate),
    };
    const [newSubscription] = await db
      .insert(subscriptions)
      .values(subscriptionData)
      .returning();
    return newSubscription;
  }

  async updateSubscription(id: string, subscriptionData: Partial<InsertSubscription>): Promise<Subscription> {
    const updateData: any = {
      ...subscriptionData,
      updatedAt: new Date(),
    };
    
    if (subscriptionData.billingDate) {
      updateData.billingDate = new Date(subscriptionData.billingDate);
    }
    
    const [updatedSubscription] = await db
      .update(subscriptions)
      .set(updateData)
      .where(eq(subscriptions.id, id))
      .returning();
    return updatedSubscription;
  }

  async deleteSubscription(id: string): Promise<void> {
    await db.delete(subscriptions).where(eq(subscriptions.id, id));
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, id));
    return subscription;
  }
}

export const storage = new DatabaseStorage();

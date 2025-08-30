import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSubscriptionSchema } from "@shared/schema";
// @ts-ignore
import { getRecommendations } from "./aiClient.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Subscription routes
  app.get("/api/subscriptions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userSubscriptions = await storage.getUserSubscriptions(userId);
      res.json(userSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  app.post("/api/subscriptions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertSubscriptionSchema.parse({
        ...req.body,
        userId,
      });
      
      const subscription = await storage.createSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(400).json({ message: "Failed to create subscription" });
    }
  });

  app.put("/api/subscriptions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;
      
      // Verify ownership
      const existing = await storage.getSubscription(id);
      if (!existing || existing.userId !== userId) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      const validatedData = insertSubscriptionSchema.partial().parse(req.body);
      const subscription = await storage.updateSubscription(id, validatedData);
      res.json(subscription);
    } catch (error) {
      console.error("Error updating subscription:", error);
      res.status(400).json({ message: "Failed to update subscription" });
    }
  });

  app.delete("/api/subscriptions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;
      
      // Verify ownership
      const existing = await storage.getSubscription(id);
      if (!existing || existing.userId !== userId) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      await storage.deleteSubscription(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      res.status(500).json({ message: "Failed to delete subscription" });
    }
  });

  // AI recommendations route
  app.get("/api/ai/recommendations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendations = await getRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Dashboard stats route
  app.get("/api/dashboard/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userSubscriptions = await storage.getUserSubscriptions(userId);
      
      const totalMonthlyCost = userSubscriptions.reduce((total, sub) => {
        const cost = parseFloat(sub.cost);
        return total + (sub.frequency === 'yearly' ? cost / 12 : cost);
      }, 0);

      const activeSubscriptions = userSubscriptions.filter(sub => sub.status === 'active').length;
      
      // Mock savings calculation
      const monthlySavings = 640; // TODO: Implement proper savings calculation

      res.json({
        totalMonthlyCost: Math.round(totalMonthlyCost),
        monthlySavings,
        activeSubscriptions,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

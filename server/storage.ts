import { users, reviews, type User, type InsertUser, type Review, type InsertReview } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reviews: Map<number, Review>;
  private currentUserId: number;
  private currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.currentUserId = 1;
    this.currentReviewId = 1;
    
    // Add some initial reviews
    this.initializeReviews();
  }

  private initializeReviews() {
    const initialReviews: Review[] = [
      {
        id: 1,
        name: "Michael Chen",
        email: "michael@techstart.com",
        rating: 5,
        comment: "Alex transformed our business with incredible AI automation solutions. ROI was achieved within 3 months!",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@growthco.com",
        rating: 5,
        comment: "The website Alex designed exceeded all expectations. Modern, fast, and perfectly captures our brand identity.",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: 3,
        name: "David Rodriguez",
        email: "david@innovatelab.com",
        rating: 5,
        comment: "Outstanding technical expertise and communication. Alex delivered complex solutions with remarkable attention to detail.",
        createdAt: new Date("2024-01-25"),
      },
    ];

    initialReviews.forEach(review => {
      this.reviews.set(review.id, review);
      this.currentReviewId = Math.max(this.currentReviewId, review.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();

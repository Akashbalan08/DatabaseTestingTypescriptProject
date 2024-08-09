import { PrismaClient } from "@prisma/client";
import { Review } from "../domains/review";
import { ReviewRepository } from "./../repositories/review";

export class ReviewService {
  private reviewRepository = new ReviewRepository();
  private prisma = new PrismaClient();

  async getAllReviews(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }

  async getReviewById(id: number): Promise<Review | null> {
    return this.reviewRepository.findById(id);
  }

  async createReview(data: Partial<Review>): Promise<Review> {
    return this.reviewRepository.create(data);
  }

  async updateReview(id: number, data: Partial<Review>): Promise<Review> {
    return this.reviewRepository.update(id, data);
  }

  async deleteReview(id: number): Promise<void> {
    return this.reviewRepository.delete(id);
  }

  async findRecentReviews(limit: number = 10): Promise<any[]> {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        book: true,
        customer: true,
      },
    });
  }
}

import { Request, Response } from "express";
import { ReviewService } from "../services/review";

export class ReviewController {
  private reviewService = new ReviewService();

  async getAllReviews(req: Request, res: Response): Promise<Response> {
    const reviews = await this.reviewService.getAllReviews();
    return res.json(reviews);
  }

  async getReviewById(req: Request, res: Response): Promise<Response> {
    const review = await this.reviewService.getReviewById(
      parseInt(req.params.id)
    );
    if (review) {
      return res.json(review);
    }
    return res.status(404).json({ message: "Review not found" });
  }

  async createReview(req: Request, res: Response): Promise<Response> {
    const newReview = await this.reviewService.createReview(req.body);
    return res.status(201).json(newReview);
  }

  async updateReview(req: Request, res: Response): Promise<Response> {
    const updatedReview = await this.reviewService.updateReview(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedReview);
  }

  async deleteReview(req: Request, res: Response): Promise<Response> {
    await this.reviewService.deleteReview(parseInt(req.params.id));
    return res.status(204).send();
  }
  async getRecentReviews(req: Request, res: Response): Promise<Response> {
    const recentReviews = await this.reviewService.findRecentReviews(10);
    return res.json(recentReviews);
  }
}

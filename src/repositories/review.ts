import { PrismaClient } from "@prisma/client";
import { Review } from "../domains/review";

export class ReviewRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async findById(id: number): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Review>): Promise<Review> {
    return this.prisma.review.create({
      data,
    });
  }

  async update(id: number, data: Partial<Review>): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
}

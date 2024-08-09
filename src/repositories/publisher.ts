import { PrismaClient } from "@prisma/client";
import { Publisher } from "../domains/publisher";

export class PublisherRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Publisher[]> {
    return this.prisma.publisher.findMany();
  }

  async findById(id: number): Promise<Publisher | null> {
    return this.prisma.publisher.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Publisher>): Promise<Publisher> {
    return this.prisma.publisher.create({
      data,
    });
  }

  async update(id: number, data: Partial<Publisher>): Promise<Publisher> {
    return this.prisma.publisher.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.publisher.delete({
      where: { id },
    });
  }
}

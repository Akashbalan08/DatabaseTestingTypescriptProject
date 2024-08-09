import { PrismaClient } from "@prisma/client";
import { Author } from "./../domains/author";

export class AuthorRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  async findById(id: number): Promise<Author | null> {
    return this.prisma.author.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Author>): Promise<Author> {
    return this.prisma.author.create({
      data,
    });
  }

  async update(id: number, data: Partial<Author>): Promise<Author> {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.author.delete({
      where: { id },
    });
  }
}

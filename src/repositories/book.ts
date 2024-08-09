import { PrismaClient } from "@prisma/client";
import { Book } from "./../domains/book";

export class BookRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findById(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Book>): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}

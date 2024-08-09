import { PrismaClient } from "@prisma/client";
import { Book } from "./../domains/book";
import { BookRepository } from "./../repositories/book";

export class BookService {
  private bookRepository = new BookRepository();
  private prisma = new PrismaClient();

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    return this.bookRepository.create(data);
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book> {
    return this.bookRepository.update(id, data);
  }

  async deleteBook(id: number): Promise<void> {
    return this.bookRepository.delete(id);
  }
  async findWellReviewedBooks(): Promise<any[]> {
    const avgRating = await this.prisma.book.aggregate({
      _avg: {
        rating: true,
      },
    });

    return this.prisma.book.findMany({
      where: {
        rating: {
          gt: avgRating._avg.rating,
        },
      },
    });
  }
  async findMostPopularGenre(): Promise<any> {
    const genres = await this.prisma.book.groupBy({
      by: ["genre"],
      _sum: {
        orders: {
          total: true,
        },
      },
      orderBy: {
        _sum: {
          orders: {
            total: "desc",
          },
        },
      },
      take: 1,
    });

    return genres[0];
  }
}

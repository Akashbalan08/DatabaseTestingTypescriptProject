import { PrismaClient } from "@prisma/client";
import { Author } from "../domains/author";
import { AuthorRepository } from "./../repositories/author";

export class AuthorService {
  private authorRepository = new AuthorRepository();
  private prisma = new PrismaClient();

  async getAllAuthors(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  async getAuthorById(id: number): Promise<Author | null> {
    return this.authorRepository.findById(id);
  }

  async createAuthor(data: Partial<Author>): Promise<Author> {
    return this.authorRepository.create(data);
  }

  async updateAuthor(id: number, data: Partial<Author>): Promise<Author> {
    return this.authorRepository.update(id, data);
  }

  async deleteAuthor(id: number): Promise<void> {
    return this.authorRepository.delete(id);
  }

  async findPowerWriters(
    genre: string,
    bookCount: number,
    years: number
  ): Promise<any[]> {
    const dateLimit = new Date();
    dateLimit.setFullYear(dateLimit.getFullYear() - years);

    const powerWriters = await this.prisma.author.findMany({
      where: {
        books: {
          some: {
            genre: genre,
            createdAt: {
              gte: dateLimit,
            },
          },
        },
      },
      include: {
        books: {
          where: {
            genre: genre,
            createdAt: {
              gte: dateLimit,
            },
          },
        },
      },
    });

    return powerWriters.filter((author) => author.books.length > bookCount);
  }
}

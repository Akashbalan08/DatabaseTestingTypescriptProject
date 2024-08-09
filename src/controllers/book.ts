import { Request, Response } from "express";
import { BookService } from "./../services/book";

export class BookController {
  private bookService = new BookService();

  async getAllBooks(req: Request, res: Response): Promise<Response> {
    const books = await this.bookService.getAllBooks();
    return res.json(books);
  }

  async getBookById(req: Request, res: Response): Promise<Response> {
    const book = await this.bookService.getBookById(parseInt(req.params.id));
    if (book) {
      return res.json(book);
    }
    return res.status(404).json({ message: "Book not found" });
  }

  async createBook(req: Request, res: Response): Promise<Response> {
    const newBook = await this.bookService.createBook(req.body);
    return res.status(201).json(newBook);
  }

  async updateBook(req: Request, res: Response): Promise<Response> {
    const updatedBook = await this.bookService.updateBook(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedBook);
  }

  async deleteBook(req: Request, res: Response): Promise<Response> {
    await this.bookService.deleteBook(parseInt(req.params.id));
    return res.status(204).send();
  }

  async getWellReviewedBooks(req: Request, res: Response): Promise<Response> {
    const wellReviewedBooks = await this.bookService.findWellReviewedBooks();
    return res.json(wellReviewedBooks);
  }

  async getMostPopularGenre(req: Request, res: Response): Promise<Response> {
    const mostPopularGenre = await this.bookService.findMostPopularGenre();
    return res.json(mostPopularGenre);
  }
}

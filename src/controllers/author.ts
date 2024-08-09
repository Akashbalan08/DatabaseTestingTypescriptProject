import { Request, Response } from "express";
import { AuthorService } from "../services/author";

export class AuthorController {
  private authorService = new AuthorService();

  async getAllAuthors(req: Request, res: Response): Promise<Response> {
    const authors = await this.authorService.getAllAuthors();
    return res.json(authors);
  }

  async getAuthorById(req: Request, res: Response): Promise<Response> {
    const author = await this.authorService.getAuthorById(
      parseInt(req.params.id)
    );
    if (author) {
      return res.json(author);
    }
    return res.status(404).json({ message: "Author not found" });
  }

  async createAuthor(req: Request, res: Response): Promise<Response> {
    const newAuthor = await this.authorService.createAuthor(req.body);
    return res.status(201).json(newAuthor);
  }

  async updateAuthor(req: Request, res: Response): Promise<Response> {
    const updatedAuthor = await this.authorService.updateAuthor(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedAuthor);
  }

  async deleteAuthor(req: Request, res: Response): Promise<Response> {
    await this.authorService.deleteAuthor(parseInt(req.params.id));
    return res.status(204).send();
  }

  async getPowerWriters(req: Request, res: Response): Promise<Response> {
    const { genre, bookCount, years } = req.query;
    const powerWriters = await this.authorService.findPowerWriters(
      genre as string,
      parseInt(bookCount as string),
      parseInt(years as string)
    );
    return res.json(powerWriters);
  }
}

import { Request, Response } from "express";
import { PublisherService } from "../services/publisher";

export class PublisherController {
  private publisherService = new PublisherService();

  async getAllPublishers(req: Request, res: Response): Promise<Response> {
    const publishers = await this.publisherService.getAllPublishers();
    return res.json(publishers);
  }

  async getPublisherById(req: Request, res: Response): Promise<Response> {
    const publisher = await this.publisherService.getPublisherById(
      parseInt(req.params.id)
    );
    if (publisher) {
      return res.json(publisher);
    }
    return res.status(404).json({ message: "Publisher not found" });
  }

  async createPublisher(req: Request, res: Response): Promise<Response> {
    const newPublisher = await this.publisherService.createPublisher(req.body);
    return res.status(201).json(newPublisher);
  }

  async updatePublisher(req: Request, res: Response): Promise<Response> {
    const updatedPublisher = await this.publisherService.updatePublisher(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedPublisher);
  }

  async deletePublisher(req: Request, res: Response): Promise<Response> {
    await this.publisherService.deletePublisher(parseInt(req.params.id));
    return res.status(204).send();
  }
}

import { PublisherRepository } from './../repositories/publisher';
import { Publisher } from "../domains/publisher";

export class PublisherService {
  private publisherRepository = new PublisherRepository();

  async getAllPublishers(): Promise<Publisher[]> {
    return this.publisherRepository.findAll();
  }

  async getPublisherById(id: number): Promise<Publisher | null> {
    return this.publisherRepository.findById(id);
  }

  async createPublisher(data: Partial<Publisher>): Promise<Publisher> {
    return this.publisherRepository.create(data);
  }

  async updatePublisher(
    id: number,
    data: Partial<Publisher>
  ): Promise<Publisher> {
    return this.publisherRepository.update(id, data);
  }

  async deletePublisher(id: number): Promise<void> {
    return this.publisherRepository.delete(id);
  }
}

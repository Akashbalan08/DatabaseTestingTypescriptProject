import { PrismaClient } from "@prisma/client";
import { Order } from "../domains/order";

export class OrderRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Order>): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async update(id: number, data: Partial<Order>): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}

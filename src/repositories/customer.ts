import { PrismaClient } from "@prisma/client";
import { Customer } from "../domains/customer";

export class CustomerRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async findById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<Customer>): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.customer.delete({
      where: { id },
    });
  }
}

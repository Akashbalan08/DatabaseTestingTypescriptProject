import { PrismaClient } from "@prisma/client";
import { Customer } from "../domains/customer";
import { CustomerRepository } from "./../repositories/customer";

export class CustomerService {
  private customerRepository = new CustomerRepository();
  private prisma = new PrismaClient();

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.create(data);
  }

  async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.update(id, data);
  }

  async deleteCustomer(id: number): Promise<void> {
    return this.customerRepository.delete(id);
  }

  async findLoyalCustomers(spent: number): Promise<any[]> {
    const dateLimit = new Date();
    dateLimit.setFullYear(dateLimit.getFullYear() - 1);

    const loyalCustomers = await this.prisma.customer.findMany({
      where: {
        orders: {
          some: {
            createdAt: {
              gte: dateLimit,
            },
          },
        },
      },
      include: {
        orders: {
          where: {
            createdAt: {
              gte: dateLimit,
            },
          },
        },
      },
    });

    return loyalCustomers.filter((customer) => {
      const totalSpent = customer.orders.reduce(
        (sum, order) => sum + order.total,
        0
      );
      return totalSpent > spent;
    });
  }
}

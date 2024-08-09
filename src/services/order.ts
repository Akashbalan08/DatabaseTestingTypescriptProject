import { Order } from "../domains/order";
import { OrderRepository } from "./../repositories/order";

export class OrderService {
  private orderRepository = new OrderRepository();

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(data);
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}

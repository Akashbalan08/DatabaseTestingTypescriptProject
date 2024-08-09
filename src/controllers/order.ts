import { Request, Response } from "express";
import { OrderService } from "../services/order";

export class OrderController {
  private orderService = new OrderService();

  async getAllOrders(req: Request, res: Response): Promise<Response> {
    const orders = await this.orderService.getAllOrders();
    return res.json(orders);
  }

  async getOrderById(req: Request, res: Response): Promise<Response> {
    const order = await this.orderService.getOrderById(parseInt(req.params.id));
    if (order) {
      return res.json(order);
    }
    return res.status(404).json({ message: "Order not found" });
  }

  async createOrder(req: Request, res: Response): Promise<Response> {
    const newOrder = await this.orderService.createOrder(req.body);
    return res.status(201).json(newOrder);
  }

  async updateOrder(req: Request, res: Response): Promise<Response> {
    const updatedOrder = await this.orderService.updateOrder(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedOrder);
  }

  async deleteOrder(req: Request, res: Response): Promise<Response> {
    await this.orderService.deleteOrder(parseInt(req.params.id));
    return res.status(204).send();
  }
}

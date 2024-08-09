import { Request, Response } from "express";
import { CustomerService } from "../services/customer";

export class CustomerController {
  private customerService = new CustomerService();

  async getAllCustomers(req: Request, res: Response): Promise<Response> {
    const customers = await this.customerService.getAllCustomers();
    return res.json(customers);
  }

  async getCustomerById(req: Request, res: Response): Promise<Response> {
    const customer = await this.customerService.getCustomerById(
      parseInt(req.params.id)
    );
    if (customer) {
      return res.json(customer);
    }
    return res.status(404).json({ message: "Customer not found" });
  }

  async createCustomer(req: Request, res: Response): Promise<Response> {
    const newCustomer = await this.customerService.createCustomer(req.body);
    return res.status(201).json(newCustomer);
  }

  async updateCustomer(req: Request, res: Response): Promise<Response> {
    const updatedCustomer = await this.customerService.updateCustomer(
      parseInt(req.params.id),
      req.body
    );
    return res.json(updatedCustomer);
  }

  async deleteCustomer(req: Request, res: Response): Promise<Response> {
    await this.customerService.deleteCustomer(parseInt(req.params.id));
    return res.status(204).send();
  }

  async getLoyalCustomers(req: Request, res: Response): Promise<Response> {
    const { spent } = req.query;
    const loyalCustomers = await this.customerService.findLoyalCustomers(
      parseFloat(spent as string)
    );
    return res.json(loyalCustomers);
  }
}

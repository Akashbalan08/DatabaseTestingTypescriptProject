export class Order {
  constructor(
    public id: number,
    public quantity: number,
    public total: number,
    public bookId: number,
    public customerId: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

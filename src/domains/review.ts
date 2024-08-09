export class Review {
  constructor(
    public id: number,
    public content: string,
    public rating: number,
    public bookId: number,
    public customerId: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

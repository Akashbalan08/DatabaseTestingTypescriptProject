export class Book {
  constructor(
    public id: number,
    public title: string,
    public genre: string,
    public rating: number | null,
    public price: number,
    public authorId: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
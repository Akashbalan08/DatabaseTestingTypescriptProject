export class Author {
  constructor(
    public id: number,
    public name: string,
    public bio: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

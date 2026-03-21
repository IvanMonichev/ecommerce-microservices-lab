export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = new.target.name
  }

  get status() {
    return this.statusCode
  }
}

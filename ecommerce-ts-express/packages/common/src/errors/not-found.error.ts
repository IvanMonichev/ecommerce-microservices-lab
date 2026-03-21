import { HttpError } from './http.error.js'

export class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}

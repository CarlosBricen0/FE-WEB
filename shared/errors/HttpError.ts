import { IError } from './Interfaces'

class HttpError extends Error implements IError {
  constructor(
    msg: string,
    public status: number,
    public data: unknown
  ) {
    super(msg)
    this.status = status
    this.data = data
  }
}

export default HttpError

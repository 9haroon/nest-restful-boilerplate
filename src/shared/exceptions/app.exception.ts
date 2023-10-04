import { HttpException } from '@nestjs/common';
import { IAppError } from './const';

export class AppException extends HttpException {
  constructor(objectOrError: IAppError) {
    const { statusCode, ...rest } = objectOrError;
    super(HttpException.createBody(rest), statusCode);
  }
}

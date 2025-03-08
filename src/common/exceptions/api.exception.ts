// src/common/exceptions/api.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
}

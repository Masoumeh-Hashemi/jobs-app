// src/common/filters/http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Structure error response
    response.status(status).json({
      statusCode: status,
      message: (errorResponse as any).message || 'An unexpected error occurred',
      error: (errorResponse as any).error || 'Internal Server Error',
    });
  }
}

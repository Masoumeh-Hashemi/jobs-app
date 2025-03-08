// src/common/interceptors/logging.interceptor.ts

import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();
    console.log(`Request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap((data) => {
        const timeTaken = Date.now() - startTime;
        console.log(
          `Response: ${JSON.stringify(data)} (Processed in ${timeTaken}ms)`,
        );
      }),
    );
  }
}

import { LoggerService } from '@fittr/logger';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        this.logger.log({
          data: {
            method: request.method,
            url: request.url,
            statusCode: response.statusCode,
          },
          request,
          response,
          status: 200,
          requestDate: new Date(),
          requestTime: Date.now(),
        });
      }),
      catchError((err: any) => {
        const { status: statusCode = 500, message = 'Internal Server Error' } =
          err;
        if (statusCode < 500) {
          this.logger.warn({
            request,
            exception: err,
            message,
            status: statusCode,
          });
        } else {
          this.logger.error({
            request,
            exception: err,
            message,
            status: statusCode,
          });
        }
        return throwError(() => err);
      }),
    );
  }
}

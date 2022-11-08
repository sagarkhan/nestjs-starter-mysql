import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  message: string;
  data: T;
  pagination: {
    pageNo: number;
    pageSize: number;
    total: number;
  };
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) =>
        data?.data
          ? {
              message: data?.message ?? 'success',
              data: data?.data ?? {},
              pagination: data?.pagination ?? undefined,
            }
          : {
              message: data?.message ?? 'success',
              data,
              pagination: undefined,
            },
      ),
    );
  }
}

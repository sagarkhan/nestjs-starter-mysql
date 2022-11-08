import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

const IS_PRODUCTION = process.env.APP_ENV === 'production';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    try {
      const status = exception.getStatus?.() ?? 500;

      const logger = new Logger('HttpExceptionFilter');

      const { name, message, stack } =
        exception instanceof HttpException
          ? {
              name: exception.name,
              message: exception.message,
              stack: exception.stack,
            }
          : new InternalServerErrorException('Internal Server Error');

      if (!(exception instanceof HttpException)) {
        logger.error(
          `${request.method} ${request.url} --> StatusCode: 500 | Message: ${
            (exception as any).message
          }`,
          (exception as any).stack,
        );
      } else if (status < 500) {
        logger.warn(
          `${request.method} ${request.url} --> StatusCode: ${status} | Message: ${message}`,
          stack,
        );
      } else {
        logger.error(
          `${request.method} ${request.url} --> StatusCode: ${status} | Message: ${message}`,
          stack,
        );
      }

      response.status(status).json({
        statusCode: status,
        message: message,
        error: {
          name,
          message,
          statusCode: status,
          stack: !IS_PRODUCTION ? stack : undefined,
          ...(exception.getResponse() as object),
        },
      });
    } catch (error) {
      response.status(500).json({
        statusCode: 500,
        message: error.message,
        error: {
          ...error,
          statusCode: 500,
          stack: !IS_PRODUCTION ? error.stack : undefined,
          ...(exception.getResponse() as object),
        },
      });
    }
  }
}

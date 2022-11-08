import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LoggedInUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || ({ id: 0 } as LoggedInUser);
  },
);

export type LoggedInUser = {
  id: number;
};

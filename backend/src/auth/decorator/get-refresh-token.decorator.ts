import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRefreshToken = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): string => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    return request.user['refreshToken'];
  },
);

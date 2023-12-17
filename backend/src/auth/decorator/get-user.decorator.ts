import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    //if data is provided, return the user data
    if (data) return request.user[data];
    //else return the whole user object
    return request.user;
  },
);

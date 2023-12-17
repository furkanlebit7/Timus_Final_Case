// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { User } from '@prisma/client';
// import { GetUser, Public } from 'src/auth/decorator';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}
//   @Get('me')
//   getMe(@GetUser() user: User) {
//     return user;
//   }

//   @Public()
//   @Post('')
//   async createUser(@Body() user: User) {
//     return await this.userService.insertUser(user);
//   }
// }

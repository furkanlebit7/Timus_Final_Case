import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const password = await argon.hash(dto.password);

    try {
      // save the user in the database
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password,
          role: {
            connect: {
              id: dto.roleId,
            },
          },
        },
      });

      // delete the password from the user object
      delete user.password;

      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already in use');
        }
      }
      throw error;
    }
  }

  signin() {
    return { msg: 'I am signin' };
  }
}

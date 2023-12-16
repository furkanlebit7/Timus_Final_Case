import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: SignUpDto) {
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

  async signin(dto: SignInDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exist throw error
    if (!user) {
      throw new ForbiddenException('Email or password is incorrect');
    }

    //compare password
    const pwMatches = await argon.verify(user.password, dto.password);

    //if password does not match throw error
    if (!pwMatches) {
      throw new ForbiddenException('Email or password is incorrect');
    }

    //send back the user
    delete user.password;
    return user;
  }
}

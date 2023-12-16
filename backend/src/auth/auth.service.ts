import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
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

      // return the saved user token
      return this.signToken(user.id, user.name, user.email, user.roleId);
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

    // return the saved user token
    return this.signToken(user.id, user.name, user.email, user.roleId);
  }
  async signToken(
    userId: number,
    name: string,
    email: string,
    roleId: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      name,
      email,
      roleId,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}

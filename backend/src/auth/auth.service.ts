import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //Signup the user
  async signup(dto: SignUpDto): Promise<Tokens> {
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
      const tokens = await this.getTokens(
        user.id,
        user.name,
        user.email,
        user.roleId,
      );
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already in use');
        }
      }
      throw error;
    }
  }
  //Signin the user
  async signin(dto: SignInDto): Promise<Tokens> {
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
    const tokens = await this.getTokens(
      user.id,
      user.name,
      user.email,
      user.roleId,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  //Logout the user
  async logout(userId: number) {
    await this.prisma.token.delete({
      where: {
        userId: userId,
      },
    });
  }

  //Refresh the user token
  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    //find the user by id
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    //if user does not exist throw error
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    //find the token in the database
    const token = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });

    //if token does not exist throw error
    if (!token) {
      throw new ForbiddenException('Access Denied');
    }

    //compare the token
    const tokenMatches = await argon.verify(token.token, refreshToken);

    //if token does not match throw error
    if (!tokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    // return the saved user token
    const tokens = await this.getTokens(
      user.id,
      user.name,
      user.email,
      user.roleId,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  //Generate the access and refresh token
  async getTokens(
    userId: number,
    name: string,
    email: string,
    roleId: number,
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      name,
      email,
      roleId,
    };
    const atSecret = this.config.get('JWT_SECRET');
    const rtSecret = this.config.get('REFRESH_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: 60 * 15, // 15 minutes
        secret: atSecret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        secret: rtSecret,
      }),
    ]);

    return { access_token: at, refresh_token: rt };
  }

  //Hash the refresh token and save it in the database
  async updateRtHash(userId: number, refreshToken: string) {
    const hashedRt = await argon.hash(refreshToken);
    //if user exist update the token else create a new token and user
    await this.prisma.token.upsert({
      where: {
        userId: userId,
      },
      update: {
        token: hashedRt,
      },
      create: {
        userId: userId,
        token: hashedRt,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });
  }
}

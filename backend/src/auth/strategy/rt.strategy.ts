import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REFRESH_SECRET'),
      passReqToCallback: true, //we need to callback the refreshtoken to hash it in db
    });
  }
  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').split(' ')[1]; // get the refresh token from the header without bearer
    return {
      ...payload,
      refreshToken,
    };
  }
}

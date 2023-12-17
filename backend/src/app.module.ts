import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/guard';
import { APP_GUARD } from '@nestjs/core';
import { FactoryModule } from './factory/factory.module';
import { FactoryDetailModule } from './factoryDetail/factoryDetail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    FactoryModule,
    PrismaModule,
    FactoryDetailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}

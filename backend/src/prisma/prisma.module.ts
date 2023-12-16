import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // means accesable from anywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

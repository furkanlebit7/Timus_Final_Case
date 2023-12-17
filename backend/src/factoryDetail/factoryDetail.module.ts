import { Module } from '@nestjs/common';
import { FactoryDetailController } from './factoryDetail.controller';
import { FactoryDetailService } from './factoryDetail.service';

@Module({
  controllers: [FactoryDetailController],
  providers: [FactoryDetailService],
})
export class FactoryDetailModule {}

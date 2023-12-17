import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { FactoryDetailService } from './factoryDetail.service';
import { FactoryDetailDto } from './dto/factoryDetail.dto';

@Public()
@Controller('factory-detail')
export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  // Gets all the factory details
  @Get('')
  getAll() {
    return this.factoryDetailService.getAll();
  }

  //   // Gets a factory detail by id
  //   @Get(':id')
  //   getFactoryDetailById(@Param('id') id: string) {
  //     return this.factoryDetailService.getFactoryDetailById(id);
  //   }

  //   // Inserts a factory detail
  @Post('')
  insertFactoryDetail(@Body() factoryDetail: FactoryDetailDto) {
    return this.factoryDetailService.insertFactoryDetail(factoryDetail);
  }

  //   // Updates a factory detail
  //   @Put(':id')
  //   async updateFactoryDetail(
  //     @Param('id') id: string,
  //     @Body() factoryDetail: FactoryDetailDto,
  //   ) {
  //     const updatedFactoryDetail =
  //       await this.factoryDetailService.updateFactoryDetail(id, factoryDetail);

  //     return updatedFactoryDetail;
  //   }

  //   // Deletes a factory detail
  //   @Delete(':id')
  //   async deleteFactoryDetail(@Param('id') id: string) {
  //     const deletedFactoryDetail =
  //       await this.factoryDetailService.deleteFactoryDetail(id);

  //     return deletedFactoryDetail;
  //   }
}

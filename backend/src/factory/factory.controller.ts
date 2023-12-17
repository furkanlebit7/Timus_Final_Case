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
import { FactoryDto } from './dto';
import { FactoryService } from './factory.service';

@Public()
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  //Gets all the factories
  @Get('')
  getAll() {
    return this.factoryService.getAll();
  }

  //Gets a factory by id
  @Get(':id')
  getFactoryById(@Param('id') id: string) {
    return this.factoryService.getFactoryById(id);
  }

  //Inserts a factory
  @Post('')
  insertFactory(@Body() factory: FactoryDto) {
    return this.factoryService.insertFactory(factory);
  }

  //Updates a factory
  @Put(':id')
  async updateFactory(@Param('id') id: string, @Body() factory: FactoryDto) {
    const updatedFactory = await this.factoryService.updateFactory(id, factory);

    return updatedFactory;
  }

  //Deletes a factory
  @Delete(':id')
  async deleteFactory(@Param('id') id: string) {
    const deletedFactory = await this.factoryService.deleteFactory(id);

    return deletedFactory;
  }
}

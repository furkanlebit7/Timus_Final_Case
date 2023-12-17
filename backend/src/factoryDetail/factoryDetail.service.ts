import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FactoryDetailDto } from './dto/factoryDetail.dto';

@Injectable()
export class FactoryDetailService {
  constructor(private readonly prisma: PrismaService) {}

  // Gets all the factory details
  async getAll() {
    return await this.prisma.factoryDetail.findMany();
  }

  // // Gets a factory by id from Prisma
  async getFactoryDetailById(id: string) {
    const factory = await this.prisma.factoryDetail.findUnique({
      where: { id: Number(id) },
    });

    if (!factory) {
      throw new NotFoundException('Factory Not Found');
    }

    return factory;
  }

  // // Inserts a factory into Prisma
  async insertFactoryDetail(factoryDetail: FactoryDetailDto) {
    return await this.prisma.factoryDetail.create({
      data: {
        usingDepartment: factoryDetail.usingDepartment,
        dateRange: factoryDetail.dateRange,
        usageKw: factoryDetail.usageKw,
        usageCost: factoryDetail.usageCost,
        discountedPrice: factoryDetail.discountedPrice,
        factoryRelation: {
          connect: {
            id: factoryDetail.factoryId,
          },
        },
      },
    });
  }

  // // Updates a factory in Prisma
  async updateFactoryDetail(id: string, factory: FactoryDetailDto) {
    const factoryDetail = await this.prisma.factoryDetail.findUnique({
      where: { id: Number(id) },
    });

    if (!factoryDetail) {
      throw new NotFoundException('Factory Not Found');
    }

    const updatedFactory = await this.prisma.factoryDetail.update({
      where: { id: Number(id) },
      data: factory,
    });

    if (!updatedFactory) {
      throw new NotFoundException('Factory Not Found');
    }

    return updatedFactory;
  }

  // // Deletes a factory from Prisma
  async deleteFactoryDetail(id: string) {
    const deletedFactory = await this.prisma.factoryDetail.delete({
      where: { id: Number(id) },
    });

    if (!deletedFactory) {
      throw new NotFoundException('Factory Not Found');
    }

    return deletedFactory;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FactoryDto } from './dto';

@Injectable({})
export class FactoryService {
  constructor(private prisma: PrismaService) {}

  //Gets all the factories
  async getAll() {
    return await this.prisma.factory.findMany();
  }

  //Gets a factory by id
  async getFactoryById(id: string) {
    const factory = await this.prisma.factory.findUnique({
      where: { id: Number(id) },
    });

    if (!factory) {
      throw new Error('Factory Not Found');
    }

    return factory;
  }

  //Inserts a factory
  async insertFactory(factory: FactoryDto) {
    return await this.prisma.factory.create({
      data: {
        companyName: factory.companyName,
        membershipEndDate: new Date(factory.membershipEndDate),
        employeeCount: factory.employeeCount,
        isFreeMember: factory.isFreeMember,
      },
    });
  }

  async updateFactory(id: string, note: FactoryDto) {
    const updatedFactory = await this.prisma.factory.update({
      where: { id: Number(id) },
      data: note,
    });

    if (!updatedFactory) {
      throw new Error('Factory Not Found');
    }

    return updatedFactory;
  }

  async deleteFactory(id: string) {
    const deletedFactory = await this.prisma.factory.delete({
      where: { id: Number(id) },
    });

    if (!deletedFactory) {
      throw new Error('Factory Not Found');
    }

    return deletedFactory;
  }
}

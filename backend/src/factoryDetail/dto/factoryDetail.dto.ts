import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FactoryDetailDto {
  @IsString()
  @IsNotEmpty()
  usingDepartment: string;

  @IsString()
  @IsNotEmpty()
  dateRange: string;

  @IsNotEmpty()
  @IsNumber()
  usageKw: number;

  @IsNotEmpty()
  @IsNumber()
  usageCost: number;

  @IsNotEmpty()
  @IsBoolean()
  discountedPrice: boolean;

  @IsNumber()
  @IsNotEmpty()
  factoryId: number;
}

import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FactoryDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  membershipEndDate: string;

  @IsNotEmpty()
  @IsNumber()
  employeeCount: number;

  @IsNotEmpty()
  @IsBoolean()
  isFreeMember: boolean;
}

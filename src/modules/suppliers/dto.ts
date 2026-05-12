import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { SupplierCategory } from './supplier.entity';

export class CreateSupplierDto {
  @IsString() @IsNotEmpty() company: string;
  @IsString() @IsNotEmpty() contactName: string;
  @IsString() phone: string;
  @IsEmail() email: string;
  @IsEnum(['Pecas originais','Pecas paralelas','Pneus','Tintas','Servicos terceirizados'] as const) category: SupplierCategory;
  @IsInt() @Min(0) @Max(60) leadTimeDays: number;
  @IsBoolean() preferred: boolean;
  @IsNumber() @Min(0) @Max(5) rating: number;
  @IsDateString() lastOrderDate: string;
}

export class UpdateSupplierDto extends CreateSupplierDto {}

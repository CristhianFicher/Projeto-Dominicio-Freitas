import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { PartCategory } from './part.entity';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @Min(0)
  minStock: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  supplier: string;

  @IsEnum(['Mecanica','Eletrica','Suspensao','Lataria','Outros'] as const)
  category: PartCategory;

  @IsNumber()
  @IsPositive()
  unitCost: number;
}

export class UpdatePartDto extends CreatePartDto {}

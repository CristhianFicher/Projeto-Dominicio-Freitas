import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const STATUS_VALUES = ['ativo', 'desligado'] as const;

export class CreateFichaAcompanhamentoDto {
  @IsString() @IsNotEmpty() estudanteId: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsDateString() dataRegistro: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsString() @IsNotEmpty() descricao: string;
  @IsOptional() @IsString() proximosPassos?: string;
}

export class UpdateFichaAcompanhamentoDto {
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsOptional() @IsDateString() dataRegistro?: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsString() proximosPassos?: string;
}

import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const STATUS_VALUES = ['ativo', 'desligado'] as const;

export class CreateEncaminhamentoDto {
  @IsString() @IsNotEmpty() estudanteId: string;
  @IsString() @IsNotEmpty() empresaId: string;
  @IsOptional() @IsString() fichaAcompanhamentoId?: string;
  @IsDateString() dataEncaminhamento: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEncaminhamentoDto {
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsOptional() @IsString() fichaAcompanhamentoId?: string;
  @IsOptional() @IsDateString() dataEncaminhamento?: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEncaminhamentoStatusDto {
  @IsString() @IsIn(STATUS_VALUES) status: string;
}

import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const STATUS_VALUES = ['ativo', 'desligado'] as const;

export class CreateEncaminhamentoDto {
  @IsString() @IsNotEmpty() estudanteId: string;
  @IsString() @IsNotEmpty() empresaId: string;
  @IsOptional() @IsString() fichaAcompanhamentoId?: string;
  @IsDateString() dataEncaminhamento: string;
  @IsOptional() @IsDateString() dataAdmissao?: string;
  @IsOptional() @IsString() @MaxLength(100) funcao?: string;
  @IsOptional() @IsString() @MaxLength(100) contatoRh?: string;
  @IsOptional() @IsDateString() dataProvavelDesligamento?: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEncaminhamentoDto {
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsOptional() @IsString() fichaAcompanhamentoId?: string;
  @IsOptional() @IsDateString() dataEncaminhamento?: string;
  @IsOptional() @IsDateString() dataAdmissao?: string;
  @IsOptional() @IsString() @MaxLength(100) funcao?: string;
  @IsOptional() @IsString() @MaxLength(100) contatoRh?: string;
  @IsOptional() @IsDateString() dataProvavelDesligamento?: string;
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEncaminhamentoStatusDto {
  @IsString() @IsIn(STATUS_VALUES) status: string;
}

export class ListEncaminhamentosQueryDto {
  @IsOptional() @IsString() @IsIn(STATUS_VALUES) status?: string;
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsString() pessoa_id?: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsOptional() @IsString() empresa_id?: string;
}

import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRelacionamentoDto {
  @IsString() @IsNotEmpty() estudanteId: string;
  @IsString() @IsNotEmpty() empresaId: string;
  @IsOptional() @IsString() @MaxLength(40) tipoRelacao?: string;
  @IsOptional() @IsString() @MaxLength(20) statusRelacao?: string;
  @IsOptional() @IsString() observacoes?: string;
  @IsOptional() @IsDateString() criadoEm?: string;
}

export class UpdateRelacionamentoDto {
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsString() empresaId?: string;
  @IsOptional() @IsString() @MaxLength(40) tipoRelacao?: string;
  @IsOptional() @IsString() @MaxLength(20) statusRelacao?: string;
  @IsOptional() @IsString() observacoes?: string;
}

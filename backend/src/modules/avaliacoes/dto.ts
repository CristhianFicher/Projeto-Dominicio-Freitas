import { IsDateString, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsString() @IsNotEmpty() estudanteId: string;
  @IsInt() @Min(1) tipoAvaliacao: number;
  @IsDateString() dataAvaliacao: string;
  @IsObject() respostas: Record<string, string>;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateAvaliacaoDto {
  @IsOptional() @IsString() estudanteId?: string;
  @IsOptional() @IsInt() @Min(1) tipoAvaliacao?: number;
  @IsOptional() @IsDateString() dataAvaliacao?: string;
  @IsOptional() @IsObject() respostas?: Record<string, string>;
  @IsOptional() @IsString() observacoes?: string;
}

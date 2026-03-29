import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateEmpresaDto {
  @IsString() @IsNotEmpty() @MaxLength(180) razaoSocial: string;
  @IsString() @IsNotEmpty() @MaxLength(180) nomeFantasia: string;
  @IsString() @IsNotEmpty() @MaxLength(30) cnpj: string;
  @IsOptional() @IsString() @MaxLength(30) ie?: string;
  @IsString() @IsNotEmpty() endereco: string;
  @IsString() @IsNotEmpty() @MaxLength(20) numeroContatoRh: string;
  @IsOptional() @IsNumber() @Min(0) renda?: number;
  @IsString() @IsNotEmpty() @MaxLength(120) areaAtuacao: string;
  @IsString() @IsNotEmpty() @MaxLength(20) porte: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEmpresaDto {
  @IsOptional() @IsString() @MaxLength(180) razaoSocial?: string;
  @IsOptional() @IsString() @MaxLength(180) nomeFantasia?: string;
  @IsOptional() @IsString() @MaxLength(30) cnpj?: string;
  @IsOptional() @IsString() @MaxLength(30) ie?: string;
  @IsOptional() @IsString() endereco?: string;
  @IsOptional() @IsString() @MaxLength(20) numeroContatoRh?: string;
  @IsOptional() @IsNumber() @Min(0) renda?: number;
  @IsOptional() @IsString() @MaxLength(120) areaAtuacao?: string;
  @IsOptional() @IsString() @MaxLength(20) porte?: string;
  @IsOptional() @IsString() observacoes?: string;
}

import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString() @IsNotEmpty() @MaxLength(150) nome: string;
  @IsString() @IsNotEmpty() @MaxLength(20) cpf: string;
  @IsString() @IsNotEmpty() @MaxLength(20) telefone: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() endereco: string;
  @IsDateString() dataNascimento: string;
  @IsDateString() dataAdmissao: string;
  @IsString() @IsNotEmpty() @MaxLength(120) funcao: string;
  @IsString() @IsNotEmpty() @MaxLength(40) departamento: string;
  @IsOptional() @IsNumber() @Min(0) salario?: number;
  @IsOptional() @IsString() @MaxLength(40) nivelEscolaridade?: string;
  @IsOptional() @IsString() experiencia?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateFuncionarioDto {
  @IsOptional() @IsString() @MaxLength(150) nome?: string;
  @IsOptional() @IsString() @MaxLength(20) cpf?: string;
  @IsOptional() @IsString() @MaxLength(20) telefone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() endereco?: string;
  @IsOptional() @IsDateString() dataNascimento?: string;
  @IsOptional() @IsDateString() dataAdmissao?: string;
  @IsOptional() @IsString() @MaxLength(120) funcao?: string;
  @IsOptional() @IsString() @MaxLength(40) departamento?: string;
  @IsOptional() @IsNumber() @Min(0) salario?: number;
  @IsOptional() @IsString() @MaxLength(40) nivelEscolaridade?: string;
  @IsOptional() @IsString() experiencia?: string;
  @IsOptional() @IsString() observacoes?: string;
}

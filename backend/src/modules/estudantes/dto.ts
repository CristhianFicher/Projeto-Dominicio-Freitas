import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEstudanteDto {
  @IsString() @IsNotEmpty() @MaxLength(150) nome: string;
  @IsString() @IsNotEmpty() @MaxLength(20) cpf: string;
  @IsDateString() dataNascimento: string;
  @IsString() @IsNotEmpty() @MaxLength(20) telefone: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() endereco: string;
  @IsOptional() @IsString() nomeResponsavel?: string;
  @IsOptional() @IsString() telefoneResponsavel?: string;
  @IsOptional() @IsString() grauAutismo?: string;
  @IsOptional() @IsString() necessidadesEspeciais?: string;
  @IsOptional() @IsString() interesses?: string;
  @IsOptional() @IsString() habilidades?: string;
  @IsOptional() @IsString() objetivosEducacionais?: string;
  @IsOptional() @IsString() objetivosProfissionais?: string;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateEstudanteDto {
  @IsOptional() @IsString() @MaxLength(150) nome?: string;
  @IsOptional() @IsString() @MaxLength(20) cpf?: string;
  @IsOptional() @IsDateString() dataNascimento?: string;
  @IsOptional() @IsString() @MaxLength(20) telefone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() endereco?: string;
  @IsOptional() @IsString() nomeResponsavel?: string;
  @IsOptional() @IsString() telefoneResponsavel?: string;
  @IsOptional() @IsString() grauAutismo?: string;
  @IsOptional() @IsString() necessidadesEspeciais?: string;
  @IsOptional() @IsString() interesses?: string;
  @IsOptional() @IsString() habilidades?: string;
  @IsOptional() @IsString() objetivosEducacionais?: string;
  @IsOptional() @IsString() objetivosProfissionais?: string;
  @IsOptional() @IsString() observacoes?: string;
}

import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExpertiseLevel, TeamRole } from './team-member.entity';

export class CreateTeamDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEnum(['Mecanico','Eletricista','Diagnostico','Pintor','Atendimento'] as const) role: TeamRole;
  @IsString() phone: string;
  @IsEmail() email: string;
  @IsBoolean() active: boolean;
  @IsEnum(['Junior','Pleno','Senior'] as const) expertiseLevel: ExpertiseLevel;
  @IsDateString() certificationExpiry: string;
  @IsDateString() hiredAt: string;
}

export class UpdateTeamDto extends CreateTeamDto {}

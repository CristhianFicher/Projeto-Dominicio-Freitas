import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ClientTier } from './client.entity';

export class CreateClientDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() phone: string;
  @IsEmail() email: string;
  @IsString() vehicle: string;
  @IsString() @Matches(/^[A-Z]{3}-?[0-9A-Z]{4}$/i) licensePlate: string;
  @IsDateString() lastVisit: string;
  @IsEnum(['Standard','Gold','Platinum'] as const) tier: ClientTier;
  @IsOptional() @IsString() preferredAdvisor?: string;
  @IsBoolean() active: boolean;
  @IsOptional() @IsString() notes?: string;
}

export class UpdateClientDto extends CreateClientDto {}

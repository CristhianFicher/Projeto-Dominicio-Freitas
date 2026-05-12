import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { RevisionPriority, RevisionStatus } from './revision.entity';

export class CreateRevisionDto {
  @IsString() @IsNotEmpty() clientName: string;
  @IsString() @IsNotEmpty() clientPhone: string;
  @IsString() @IsNotEmpty() vehicleModel: string;
  @IsString() @Matches(/^[A-Z]{3}-?[0-9A-Z]{4}$/i) licensePlate: string;
  @IsString() @IsNotEmpty() serviceDescription: string;
  @IsDateString() scheduledDate: string;
  @IsString() @Matches(/^\d{2}:\d{2}$/) @MaxLength(5) scheduledTime: string;
  @IsEnum(['agendada','em andamento','concluida'] as const) status: RevisionStatus;
  @IsEnum(['alta','media','baixa'] as const) priority: RevisionPriority;
  @IsOptional() @IsString() assignedTo?: string;
  @IsOptional() @IsString() notes?: string;
  @IsBoolean() remindersEnabled: boolean;
}

export class UpdateRevisionDto extends CreateRevisionDto {}

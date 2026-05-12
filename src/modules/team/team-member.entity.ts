import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type TeamRole = 'Mecanico' | 'Eletricista' | 'Diagnostico' | 'Pintor' | 'Atendimento';
export type ExpertiseLevel = 'Junior' | 'Pleno' | 'Senior';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Index() @Column({ length: 120 }) name: string;
  @Column({ type: 'varchar', length: 20 }) role: TeamRole;
  @Column({ length: 20 }) phone: string;
  @Index({ unique: true }) @Column({ length: 160 }) email: string;
  @Column({ default: true }) active: boolean;
  @Column({ type: 'varchar', length: 20 }) expertiseLevel: ExpertiseLevel;
  @Column({ type: 'date' }) certificationExpiry: string;
  @Column({ type: 'date' }) hiredAt: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export type ClientTier = 'Standard' | 'Gold' | 'Platinum';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Index() @Column({ length: 120 }) name: string;
  @Column({ length: 20 }) phone: string;
  @Index({ unique: true }) @Column({ length: 160 }) email: string;
  @Column({ length: 120 }) vehicle: string;
  @Column({ length: 10 }) licensePlate: string;
  @Column({ type: 'date' }) lastVisit: string;
  @Column({ type: 'varchar', length: 10 }) tier: ClientTier;
  @Column({ type: 'uuid', nullable: true }) preferredAdvisor?: string | null;
  @Column({ default: true }) active: boolean;
  @Column({ type: 'text', nullable: true }) notes?: string | null;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

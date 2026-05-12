import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type RevisionStatus = 'agendada' | 'em andamento' | 'concluida';
export type RevisionPriority = 'alta' | 'media' | 'baixa';

@Entity('revisions')
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  clientName: string;

  @Column({ length: 20 })
  clientPhone: string;

  @Column({ length: 120 })
  vehicleModel: string;

  @Column({ length: 10 })
  licensePlate: string;

  @Column({ type: 'text' })
  serviceDescription: string;

  @Column({ type: 'timestamptz' })
  scheduledDate: Date;

  @Column({ length: 5 })
  scheduledTime: string;

  @Column({ type: 'varchar', length: 20 })
  status: RevisionStatus;

  @Column({ type: 'varchar', length: 10 })
  priority: RevisionPriority;

  @Column({ type: 'uuid', nullable: true })
  assignedTo?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ type: 'boolean', default: false })
  remindersEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

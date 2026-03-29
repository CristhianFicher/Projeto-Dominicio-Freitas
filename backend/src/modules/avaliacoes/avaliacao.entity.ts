import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Estudante } from '../estudantes/estudante.entity';

@Entity('avaliacoes')
@Unique(['estudanteId', 'tipoAvaliacao'])
export class Avaliacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  estudanteId: string;

  @ManyToOne(() => Estudante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estudanteId' })
  estudante: Estudante;

  @Column({ type: 'int' })
  tipoAvaliacao: number;

  @Column({ type: 'date' })
  dataAvaliacao: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  respostas: Record<string, string>;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

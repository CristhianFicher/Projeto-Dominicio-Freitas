import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Estudante } from '../estudantes/estudante.entity';
import { Empresa } from '../empresas/empresa.entity';

@Entity('relacionamentos')
export class Relacionamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  estudanteId: string;

  @Column({ type: 'uuid' })
  empresaId: string;

  @ManyToOne(() => Estudante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estudanteId' })
  estudante: Estudante;

  @ManyToOne(() => Empresa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ length: 40, default: 'encaminhamento' })
  tipoRelacao: string;

  @Column({ length: 20, default: 'ativo' })
  statusRelacao: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  criadoEm: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

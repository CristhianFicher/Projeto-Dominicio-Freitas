import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Empresa } from '../empresas/empresa.entity';
import { Estudante } from '../estudantes/estudante.entity';
import { FichaAcompanhamento } from '../fichas/ficha-acompanhamento.entity';

@Entity('encaminhamentos')
export class Encaminhamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  estudanteId: string;

  @Column({ type: 'uuid' })
  empresaId: string;

  @Column({ type: 'uuid', nullable: true })
  fichaAcompanhamentoId?: string | null;

  @ManyToOne(() => Estudante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estudanteId' })
  estudante: Estudante;

  @ManyToOne(() => Empresa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @ManyToOne(() => FichaAcompanhamento, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fichaAcompanhamentoId' })
  fichaAcompanhamento?: FichaAcompanhamento | null;

  @Column({ type: 'date' })
  dataEncaminhamento: string;

  @Column({ type: 'date', nullable: true })
  dataAdmissao?: string | null;

  @Column({ length: 100, nullable: true })
  funcao?: string | null;

  @Column({ length: 100, nullable: true })
  contatoRh?: string | null;

  @Column({ type: 'date', nullable: true })
  dataProvavelDesligamento?: string | null;

  @Column({ length: 20, default: 'ativo' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

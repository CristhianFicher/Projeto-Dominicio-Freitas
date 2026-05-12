import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Estudante } from '../estudantes/estudante.entity';
import { Empresa } from '../empresas/empresa.entity';

@Entity('fichas_acompanhamento')
export class FichaAcompanhamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  estudanteId: string;

  @Column({ type: 'uuid', nullable: true })
  empresaId?: string | null;

  @ManyToOne(() => Estudante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estudanteId' })
  estudante: Estudante;

  @ManyToOne(() => Empresa, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'empresaId' })
  empresa?: Empresa | null;

  @Column({ type: 'date' })
  dataRegistro: string;

  @Column({ length: 20, default: 'ativo' })
  status: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  proximosPassos?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Estudante } from '../estudantes/estudante.entity';

@Entity('avaliacoes')
@Unique(['pessoa_id', 'tipo'])
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pessoa_id', type: 'uuid' })
  pessoa_id: string;

  @ManyToOne(() => Estudante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Estudante;

  @Column({ name: 'data_avaliacao', type: 'date' })
  data_avaliacao: string;

  @Column({ type: 'varchar', length: 20 })
  tipo: 'inicial' | 'acompanhamento';

  @Column({ name: 'professor_responsavel', type: 'varchar', length: 100 })
  professor_responsavel: string;

  @Column({ type: 'varchar', length: 20, nullable: true }) q01?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q02?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q03?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q04?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q05?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q06?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q07?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q08?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q09?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q10?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q11?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q12?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q13?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q14?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q15?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q16?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q17?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q18?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q19?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q20?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q21?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q22?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q23?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q24?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q25?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q26?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q27?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q28?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q29?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q30?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q31?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q32?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q33?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q34?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q35?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q36?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q37?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q38?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q39?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q40?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q41?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q42?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q43?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q44?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q45?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) q46?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

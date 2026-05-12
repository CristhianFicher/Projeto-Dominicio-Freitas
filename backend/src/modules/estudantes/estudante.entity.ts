import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('estudantes')
export class Estudante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 20 })
  cpf: string;

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 180 })
  email: string;

  @Column({ type: 'text' })
  endereco: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  nomeResponsavel?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefoneResponsavel?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  grauAutismo?: string | null;

  @Column({ type: 'text', nullable: true })
  necessidadesEspeciais?: string | null;

  @Column({ type: 'text', nullable: true })
  interesses?: string | null;

  @Column({ type: 'text', nullable: true })
  habilidades?: string | null;

  @Column({ type: 'text', nullable: true })
  objetivosEducacionais?: string | null;

  @Column({ type: 'text', nullable: true })
  objetivosProfissionais?: string | null;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

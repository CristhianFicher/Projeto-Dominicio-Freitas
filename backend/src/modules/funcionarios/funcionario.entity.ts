import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 20 })
  cpf: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 180 })
  email: string;

  @Column({ type: 'text' })
  endereco: string;

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column({ type: 'date' })
  dataAdmissao: string;

  @Column({ length: 120 })
  funcao: string;

  @Column({ length: 40 })
  departamento: string;

  @Column({ type: 'float', default: 0 })
  salario: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  nivelEscolaridade?: string | null;

  @Column({ type: 'text', nullable: true })
  experiencia?: string | null;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

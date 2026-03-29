import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 180 })
  razaoSocial: string;

  @Column({ length: 180 })
  nomeFantasia: string;

  @Column({ length: 30 })
  cnpj: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  ie?: string | null;

  @Column({ type: 'text' })
  endereco: string;

  @Column({ length: 20 })
  numeroContatoRh: string;

  @Column({ type: 'float', default: 0 })
  renda: number;

  @Column({ length: 120 })
  areaAtuacao: string;

  @Column({ length: 20 })
  porte: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

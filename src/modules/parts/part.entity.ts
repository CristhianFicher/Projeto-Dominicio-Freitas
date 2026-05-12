import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type PartCategory = 'Mecanica' | 'Eletrica' | 'Suspensao' | 'Lataria' | 'Outros';

@Entity('parts')
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 120 })
  name: string;

  @Index({ unique: true })
  @Column({ length: 40 })
  code: string;

  @Column('int')
  quantity: number;

  @Column('int')
  minStock: number;

  @Column({ length: 80 })
  location: string;

  @Column({ length: 80 })
  supplier: string;

  @Column({ type: 'varchar', length: 20 })
  category: PartCategory;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  unitCost: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

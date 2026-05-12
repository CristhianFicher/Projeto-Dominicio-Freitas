import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export type SupplierCategory = 'Pecas originais' | 'Pecas paralelas' | 'Pneus' | 'Tintas' | 'Servicos terceirizados';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Index() @Column({ length: 120 }) company: string;
  @Column({ length: 120 }) contactName: string;
  @Column({ length: 20 }) phone: string;
  @Index({ unique: true }) @Column({ length: 160 }) email: string;
  @Column({ type: 'varchar', length: 30 }) category: SupplierCategory;
  @Column('int') leadTimeDays: number;
  @Column('boolean') preferred: boolean;
  @Column('numeric', { precision: 3, scale: 1 }) rating: number;
  @Column({ type: 'date' }) lastOrderDate: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

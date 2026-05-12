import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) {}

  async list() { return this.repo.find({ order: { company: 'ASC' } }); }
  async get(id: string) { const s = await this.repo.findOne({ where: { id } }); if (!s) throw new HttpException('SUPPLIER_NOT_FOUND', HttpStatus.NOT_FOUND); return s; }

  async create(dto: CreateSupplierDto) {
    // RN1: e-mail único por fornecedor
    if (await this.repo.findOne({ where: { email: dto.email } })) throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    // RN2: rating entre 0 e 5
    if (dto.rating < 0 || dto.rating > 5) throw new HttpException('INVALID_RATING', HttpStatus.BAD_REQUEST);
    // RN3: lead time máximo 60 dias
    if (dto.leadTimeDays > 60) throw new HttpException('LEAD_TIME_TOO_HIGH', HttpStatus.BAD_REQUEST);
    const entity = this.repo.create(dto); return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateSupplierDto) {
    const s = await this.get(id);
    if (dto.email && dto.email !== s.email && (await this.repo.findOne({ where: { email: dto.email } })))
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    Object.assign(s, dto); return this.repo.save(s);
  }

  async remove(id: string) { const s = await this.get(id); await this.repo.delete(id); return { deleted: true }; }
}

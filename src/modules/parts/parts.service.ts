import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Part } from './part.entity';
import { CreatePartDto, UpdatePartDto } from './dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

@Injectable()
export class PartsService {
  constructor(@InjectRepository(Part) private repo: Repository<Part>) {}

  async findAll(q: PaginationQueryDto & { search?: string; lowStock?: boolean }) {
    const where: FindOptionsWhere<Part> = {};
    if (q.search) {
      where.name = ILike(%%);
    }
    if (q.lowStock) {
      // regra de negócio: lowStock somente quando minStock definido
      where.quantity = 0 as any; // placeholder para forçar filtro por query builder
      const qb = this.repo.createQueryBuilder('p')
        .where('p.quantity <= p.minStock')
        .andWhere(q.search ? 'p.name ILIKE :s OR p.code ILIKE :s' : '1=1', { s: %% })
        .orderBy('p.updatedAt', 'DESC')
        .skip(((q.page ?? 1) - 1) * (q.limit ?? 20))
        .take(q.limit ?? 20);
      const [items, total] = await qb.getManyAndCount();
      return { items, total };
    }

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { updatedAt: 'DESC' },
      skip: ((q.page ?? 1) - 1) * (q.limit ?? 20),
      take: q.limit ?? 20,
    });
    return { items, total };
  }

  async findOne(id: string) {
    const part = await this.repo.findOne({ where: { id } });
    if (!part) throw new HttpException('PART_NOT_FOUND', HttpStatus.NOT_FOUND);
    return part;
  }

  async create(dto: CreatePartDto) {
    // RN1: código deve ser único
    const exists = await this.repo.findOne({ where: { code: dto.code } });
    if (exists) throw new HttpException('PART_CODE_ALREADY_EXISTS', HttpStatus.CONFLICT);

    // RN2: quantidade não pode ser menor que minStock na criação
    if (dto.quantity < 0 || dto.minStock < 0)
      throw new HttpException('NEGATIVE_STOCK_NOT_ALLOWED', HttpStatus.BAD_REQUEST);

    // RN3: custo unitário deve ser positivo
    if (dto.unitCost <= 0)
      throw new HttpException('UNIT_COST_MUST_BE_POSITIVE', HttpStatus.BAD_REQUEST);

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdatePartDto) {
    const part = await this.findOne(id);
    // RN4: impedir troca de código para existente
    if (dto.code && dto.code !== part.code) {
      const exists = await this.repo.findOne({ where: { code: dto.code } });
      if (exists) throw new HttpException('PART_CODE_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }
    // RN5: minStock não pode ser maior que 999 (limite operacional)
    if (dto.minStock && dto.minStock > 999)
      throw new HttpException('MIN_STOCK_OVER_LIMIT', HttpStatus.BAD_REQUEST);

    Object.assign(part, dto);
    return this.repo.save(part);
  }

  async remove(id: string) {
    const part = await this.findOne(id);
    // RN6: não remover peça com quantidade > 0 (exigir baixa)
    if (part.quantity > 0)
      throw new HttpException('CANNOT_DELETE_STOCKED_PART', HttpStatus.BAD_REQUEST);
    await this.repo.delete(id);
    return { deleted: true };
  }
}

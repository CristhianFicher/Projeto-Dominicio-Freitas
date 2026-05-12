import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relacionamento } from './relacionamento.entity';
import { CreateRelacionamentoDto, UpdateRelacionamentoDto } from './dto';

@Injectable()
export class RelacionamentosService {
  constructor(
    @InjectRepository(Relacionamento) private readonly repo: Repository<Relacionamento>,
  ) {}

  list() {
    return this.repo.find({ order: { criadoEm: 'DESC' } });
  }

  async get(id: string) {
    const relacionamento = await this.repo.findOne({ where: { id } });
    if (!relacionamento) {
      throw new NotFoundException('Relacionamento nao encontrado');
    }
    return relacionamento;
  }

  create(dto: CreateRelacionamentoDto) {
    return this.repo.save(
      this.repo.create({
        ...dto,
        criadoEm: dto.criadoEm ? new Date(dto.criadoEm) : undefined,
      }),
    );
  }

  async update(id: string, dto: UpdateRelacionamentoDto) {
    const relacionamento = await this.get(id);
    this.repo.merge(relacionamento, dto);
    return this.repo.save(relacionamento);
  }

  async remove(id: string) {
    const relacionamento = await this.get(id);
    await this.repo.remove(relacionamento);
    return { id };
  }
}

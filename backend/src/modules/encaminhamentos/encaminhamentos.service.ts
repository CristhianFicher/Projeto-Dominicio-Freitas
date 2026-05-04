import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encaminhamento } from './encaminhamento.entity';
import { CreateEncaminhamentoDto, ListEncaminhamentosQueryDto, UpdateEncaminhamentoDto } from './dto';

@Injectable()
export class EncaminhamentosService {
  constructor(
    @InjectRepository(Encaminhamento) private readonly repo: Repository<Encaminhamento>,
  ) {}

  list(query?: ListEncaminhamentosQueryDto) {
    const estudanteId = query?.estudanteId || query?.pessoa_id;
    const empresaId = query?.empresaId || query?.empresa_id;

    return this.repo.find({
      where: {
        ...(query?.status ? { status: query.status } : {}),
        ...(estudanteId ? { estudanteId } : {}),
        ...(empresaId ? { empresaId } : {}),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async get(id: string) {
    const encaminhamento = await this.repo.findOne({ where: { id } });
    if (!encaminhamento) {
      throw new NotFoundException('Encaminhamento nao encontrado');
    }
    return encaminhamento;
  }

  create(dto: CreateEncaminhamentoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateEncaminhamentoDto) {
    const encaminhamento = await this.get(id);
    this.repo.merge(encaminhamento, dto);
    return this.repo.save(encaminhamento);
  }

  async updateStatus(id: string, status: string) {
    const encaminhamento = await this.get(id);
    encaminhamento.status = status;
    return this.repo.save(encaminhamento);
  }
}

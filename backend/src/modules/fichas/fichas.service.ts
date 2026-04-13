import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaAcompanhamento } from './ficha-acompanhamento.entity';
import { CreateFichaAcompanhamentoDto, UpdateFichaAcompanhamentoDto } from './dto';

@Injectable()
export class FichasService {
  constructor(
    @InjectRepository(FichaAcompanhamento) private readonly repo: Repository<FichaAcompanhamento>,
  ) {}

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: string) {
    const ficha = await this.repo.findOne({ where: { id } });
    if (!ficha) {
      throw new NotFoundException('Ficha de acompanhamento nao encontrada');
    }
    return ficha;
  }

  create(dto: CreateFichaAcompanhamentoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateFichaAcompanhamentoDto) {
    const ficha = await this.get(id);
    this.repo.merge(ficha, dto);
    return this.repo.save(ficha);
  }
}

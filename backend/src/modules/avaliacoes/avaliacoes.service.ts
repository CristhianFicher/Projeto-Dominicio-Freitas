import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';
import { CreateAvaliacaoDto, UpdateAvaliacaoDto } from './dto';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao) private readonly repo: Repository<Avaliacao>,
  ) {}

  list(pessoa_id?: string) {
    return this.repo.find({
      where: pessoa_id ? { pessoa_id } : undefined,
      order: { data_avaliacao: 'DESC', created_at: 'DESC' },
    });
  }

  async get(id: number) {
    const avaliacao = await this.repo.findOne({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException('Avaliacao nao encontrada');
    }
    return avaliacao;
  }

  create(dto: CreateAvaliacaoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateAvaliacaoDto) {
    const avaliacao = await this.get(id);
    this.repo.merge(avaliacao, dto);
    return this.repo.save(avaliacao);
  }

  async remove(id: number) {
    const avaliacao = await this.get(id);
    await this.repo.remove(avaliacao);
    return { id };
  }
}

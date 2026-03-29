import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudante } from './estudante.entity';
import { CreateEstudanteDto, UpdateEstudanteDto } from './dto';

@Injectable()
export class EstudantesService {
  constructor(
    @InjectRepository(Estudante) private readonly repo: Repository<Estudante>,
  ) {}

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: string) {
    const estudante = await this.repo.findOne({ where: { id } });
    if (!estudante) {
      throw new NotFoundException('Estudante nao encontrado');
    }
    return estudante;
  }

  create(dto: CreateEstudanteDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateEstudanteDto) {
    const estudante = await this.get(id);
    this.repo.merge(estudante, dto);
    return this.repo.save(estudante);
  }

  async remove(id: string) {
    const estudante = await this.get(id);
    await this.repo.remove(estudante);
    return { id };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa) private readonly repo: Repository<Empresa>,
  ) {}

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: string) {
    const empresa = await this.repo.findOne({ where: { id } });
    if (!empresa) {
      throw new NotFoundException('Empresa nao encontrada');
    }
    return empresa;
  }

  create(dto: CreateEmpresaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateEmpresaDto) {
    const empresa = await this.get(id);
    this.repo.merge(empresa, dto);
    return this.repo.save(empresa);
  }

  async remove(id: string) {
    const empresa = await this.get(id);
    await this.repo.remove(empresa);
    return { id };
  }
}

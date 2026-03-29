import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { CreateFuncionarioDto, UpdateFuncionarioDto } from './dto';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario) private readonly repo: Repository<Funcionario>,
  ) {}

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: string) {
    const funcionario = await this.repo.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException('Funcionario nao encontrado');
    }
    return funcionario;
  }

  create(dto: CreateFuncionarioDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateFuncionarioDto) {
    const funcionario = await this.get(id);
    this.repo.merge(funcionario, dto);
    return this.repo.save(funcionario);
  }

  async remove(id: string) {
    const funcionario = await this.get(id);
    await this.repo.remove(funcionario);
    return { id };
  }
}

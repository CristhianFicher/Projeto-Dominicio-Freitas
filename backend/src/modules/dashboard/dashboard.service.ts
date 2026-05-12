import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudante } from '../estudantes/estudante.entity';
import { Empresa } from '../empresas/empresa.entity';
import { Funcionario } from '../funcionarios/funcionario.entity';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { FichaAcompanhamento } from '../fichas/ficha-acompanhamento.entity';
import { Encaminhamento } from '../encaminhamentos/encaminhamento.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Estudante) private readonly estudantesRepo: Repository<Estudante>,
    @InjectRepository(Empresa) private readonly empresasRepo: Repository<Empresa>,
    @InjectRepository(Funcionario) private readonly funcionariosRepo: Repository<Funcionario>,
    @InjectRepository(Avaliacao) private readonly avaliacoesRepo: Repository<Avaliacao>,
    @InjectRepository(FichaAcompanhamento) private readonly fichasRepo: Repository<FichaAcompanhamento>,
    @InjectRepository(Encaminhamento) private readonly encaminhamentosRepo: Repository<Encaminhamento>,
  ) {}

  async getOverview() {
    const [
      estudantes,
      empresas,
      funcionarios,
      avaliacoes,
      fichasAcompanhamento,
      encaminhamentosAtivos,
      encaminhamentosDesligados,
      encaminhamentosRecentes,
      fichasRecentes,
    ] = await Promise.all([
      this.estudantesRepo.count(),
      this.empresasRepo.count(),
      this.funcionariosRepo.count(),
      this.avaliacoesRepo.count(),
      this.fichasRepo.count(),
      this.encaminhamentosRepo.count({ where: { status: 'ativo' } }),
      this.encaminhamentosRepo.count({ where: { status: 'desligado' } }),
      this.encaminhamentosRepo.find({ order: { createdAt: 'DESC' }, take: 5 }),
      this.fichasRepo.find({ order: { createdAt: 'DESC' }, take: 5 }),
    ]);

    return {
      resumo: {
        estudantes,
        empresas,
        funcionarios,
        avaliacoes,
        fichasAcompanhamento,
        encaminhamentosAtivos,
        encaminhamentosDesligados,
      },
      encaminhamentosRecentes,
      fichasRecentes,
    };
  }
}

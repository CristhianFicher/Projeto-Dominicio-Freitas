import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Estudante } from '../estudantes/estudante.entity';
import { Empresa } from '../empresas/empresa.entity';
import { Funcionario } from '../funcionarios/funcionario.entity';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { FichaAcompanhamento } from '../fichas/ficha-acompanhamento.entity';
import { Encaminhamento } from '../encaminhamentos/encaminhamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudante,
      Empresa,
      Funcionario,
      Avaliacao,
      FichaAcompanhamento,
      Encaminhamento,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

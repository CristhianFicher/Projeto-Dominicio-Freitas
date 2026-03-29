import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './avaliacao.entity';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { Estudante } from '../estudantes/estudante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao, Estudante])],
  providers: [AvaliacoesService],
  controllers: [AvaliacoesController],
  exports: [TypeOrmModule],
})
export class AvaliacoesModule {}

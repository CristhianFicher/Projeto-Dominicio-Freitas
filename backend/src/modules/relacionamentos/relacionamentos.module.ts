import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relacionamento } from './relacionamento.entity';
import { RelacionamentosService } from './relacionamentos.service';
import { RelacionamentosController } from './relacionamentos.controller';
import { Estudante } from '../estudantes/estudante.entity';
import { Empresa } from '../empresas/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relacionamento, Estudante, Empresa])],
  providers: [RelacionamentosService],
  controllers: [RelacionamentosController],
  exports: [TypeOrmModule],
})
export class RelacionamentosModule {}

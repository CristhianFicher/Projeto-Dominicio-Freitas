import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encaminhamento } from './encaminhamento.entity';
import { EncaminhamentosController } from './encaminhamentos.controller';
import { EncaminhamentosService } from './encaminhamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Encaminhamento])],
  controllers: [EncaminhamentosController],
  providers: [EncaminhamentosService],
  exports: [TypeOrmModule],
})
export class EncaminhamentosModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './funcionario.entity';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  providers: [FuncionariosService],
  controllers: [FuncionariosController],
  exports: [TypeOrmModule],
})
export class FuncionariosModule {}

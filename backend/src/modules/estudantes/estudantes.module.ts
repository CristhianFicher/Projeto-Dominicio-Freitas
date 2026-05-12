import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './estudante.entity';
import { EstudantesService } from './estudantes.service';
import { EstudantesController } from './estudantes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudante])],
  providers: [EstudantesService],
  controllers: [EstudantesController],
  exports: [TypeOrmModule],
})
export class EstudantesModule {}

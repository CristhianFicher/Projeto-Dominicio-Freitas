import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaAcompanhamento } from './ficha-acompanhamento.entity';
import { FichasService } from './fichas.service';
import { FichasController } from './fichas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FichaAcompanhamento])],
  providers: [FichasService],
  controllers: [FichasController],
  exports: [TypeOrmModule],
})
export class FichasModule {}

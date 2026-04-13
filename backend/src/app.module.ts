import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudantesModule } from './modules/estudantes/estudantes.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { AvaliacoesModule } from './modules/avaliacoes/avaliacoes.module';
import { RelacionamentosModule } from './modules/relacionamentos/relacionamentos.module';
import { FichasModule } from './modules/fichas/fichas.module';
import { EncaminhamentosModule } from './modules/encaminhamentos/encaminhamentos.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    EstudantesModule,
    EmpresasModule,
    FuncionariosModule,
    AvaliacoesModule,
    RelacionamentosModule,
    FichasModule,
    EncaminhamentosModule,
    DashboardModule,
  ],
})
export class AppModule {}

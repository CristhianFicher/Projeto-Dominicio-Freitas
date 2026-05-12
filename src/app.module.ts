import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { Part } from './modules/parts/part.entity';
import { Revision } from './modules/revisions/revision.entity';
import { TeamMember } from './modules/team/team-member.entity';
import { Client } from './modules/clients/client.entity';
import { Supplier } from './modules/suppliers/supplier.entity';
import { PartsModule } from './modules/parts/parts.module';
import { RevisionsModule } from './modules/revisions/revisions.module';
import { TeamModule } from './modules/team/team.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

const ormConfig = (): DataSourceOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: false,
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    PartsModule,
    RevisionsModule,
    TeamModule,
    ClientsModule,
    SuppliersModule,
    DashboardModule,
  ],
})
export class AppModule {}

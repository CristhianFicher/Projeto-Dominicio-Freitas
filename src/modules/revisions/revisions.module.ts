import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revision } from './revision.entity';
import { RevisionsService } from './revisions.service';
import { RevisionsController } from './revisions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Revision])],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}

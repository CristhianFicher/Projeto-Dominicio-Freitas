import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RevisionsService } from './revisions.service';
import { CreateRevisionDto, UpdateRevisionDto } from './dto';

@Controller('revisions')
export class RevisionsController {
  constructor(private readonly service: RevisionsService) {}

  @Get()
  list() { return this.service.list(); }

  @Get(':id')
  get(@Param('id') id: string) { return this.service.get(id); }

  @Post()
  create(@Body() dto: CreateRevisionDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRevisionDto) { return this.service.update(id, dto); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto, UpdateAvaliacaoDto } from './dto';

@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private readonly service: AvaliacoesService) {}

  @Get()
  list(@Query('pessoa_id') pessoa_id?: string) {
    return this.service.list(pessoa_id);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(Number(id));
  }

  @Post()
  create(@Body() dto: CreateAvaliacaoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAvaliacaoDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}

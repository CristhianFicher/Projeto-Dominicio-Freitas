import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FichasService } from './fichas.service';
import { CreateFichaAcompanhamentoDto, UpdateFichaAcompanhamentoDto } from './dto';

@Controller('fichas')
export class FichasController {
  constructor(private readonly service: FichasService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateFichaAcompanhamentoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFichaAcompanhamentoDto) {
    return this.service.update(id, dto);
  }
}

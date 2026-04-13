import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { EncaminhamentosService } from './encaminhamentos.service';
import { CreateEncaminhamentoDto, UpdateEncaminhamentoDto, UpdateEncaminhamentoStatusDto } from './dto';

@Controller('encaminhamentos')
export class EncaminhamentosController {
  constructor(private readonly service: EncaminhamentosService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateEncaminhamentoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEncaminhamentoDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateEncaminhamentoStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }
}

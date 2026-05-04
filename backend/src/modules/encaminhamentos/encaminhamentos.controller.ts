import { Body, Controller, UseGuards, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard';
import { EncaminhamentosService } from './encaminhamentos.service';
import { CreateEncaminhamentoDto, ListEncaminhamentosQueryDto, UpdateEncaminhamentoDto, UpdateEncaminhamentoStatusDto } from './dto';

@Controller('encaminhamentos')
@UseGuards(AuthGuard)
export class EncaminhamentosController {
  constructor(private readonly service: EncaminhamentosService) {}

  @Get()
  list(@Query() query: ListEncaminhamentosQueryDto) {
    return this.service.list(query);
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

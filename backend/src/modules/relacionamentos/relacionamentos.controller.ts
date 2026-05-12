import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard';
import { RelacionamentosService } from './relacionamentos.service';
import { CreateRelacionamentoDto, UpdateRelacionamentoDto } from './dto';

@Controller('relacionamentos')
@UseGuards(AuthGuard)
export class RelacionamentosController {
  constructor(private readonly service: RelacionamentosService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateRelacionamentoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRelacionamentoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

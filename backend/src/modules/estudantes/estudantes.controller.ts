import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard';
import { EstudantesService } from './estudantes.service';
import { CreateEstudanteDto, UpdateEstudanteDto } from './dto';

@Controller('estudantes')
@UseGuards(AuthGuard)
export class EstudantesController {
  constructor(private readonly service: EstudantesService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateEstudanteDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEstudanteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

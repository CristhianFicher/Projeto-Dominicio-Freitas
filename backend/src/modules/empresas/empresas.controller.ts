import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';

@Controller('empresas')
@UseGuards(AuthGuard)
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Get()
  list(@Query('q') q?: string, @Query('cnpj') cnpj?: string) {
    return this.service.list({ q, cnpj });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateEmpresaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmpresaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

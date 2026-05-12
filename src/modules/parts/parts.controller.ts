import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto, UpdatePartDto } from './dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly service: PartsService) {}

  @Get()
  findAll(@Query() q: PaginationQueryDto & { search?: string; lowStock?: boolean }) {
    return this.service.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePartDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

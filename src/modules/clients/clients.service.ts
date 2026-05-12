import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  async list() { return this.repo.find({ order: { name: 'ASC' } }); }
  async get(id: string) { const c = await this.repo.findOne({ where: { id } }); if (!c) throw new HttpException('CLIENT_NOT_FOUND', HttpStatus.NOT_FOUND); return c; }

  async create(dto: CreateClientDto) {
    // RN1: email único
    if (await this.repo.findOne({ where: { email: dto.email } })) throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    // RN2: lastVisit não futuro
    if (new Date(dto.lastVisit) > new Date()) throw new HttpException('LAST_VISIT_IN_FUTURE', HttpStatus.BAD_REQUEST);
    // RN3: placa válida
    if (!/^[A-Z]{3}-?[0-9A-Z]{4}$/i.test(dto.licensePlate)) throw new HttpException('INVALID_LICENSE_PLATE', HttpStatus.BAD_REQUEST);
    const entity = this.repo.create(dto); return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateClientDto) {
    const c = await this.get(id);
    if (dto.email && dto.email !== c.email && (await this.repo.findOne({ where: { email: dto.email } })))
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.CONFLICT);
    Object.assign(c, dto); return this.repo.save(c);
  }

  async remove(id: string) { const c = await this.get(id); if (c.active) throw new HttpException('CANNOT_DELETE_ACTIVE_CLIENT', HttpStatus.BAD_REQUEST); await this.repo.delete(id); return { deleted: true }; }
}

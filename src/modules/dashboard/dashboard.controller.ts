import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from '../parts/part.entity';
import { Revision } from '../revisions/revision.entity';
import { Client } from '../clients/client.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(Part) private parts: Repository<Part>,
    @InjectRepository(Revision) private revisions: Repository<Revision>,
    @InjectRepository(Client) private clients: Repository<Client>,
  ) {}

  @Get()
  async summary() {
    const lowStock = await this.parts.createQueryBuilder('p').where('p.quantity <= p.minStock').getCount();
    const stockValue = await this.parts.createQueryBuilder('p').select('SUM(p.quantity * p.unitCost)', 'sum').getRawOne();
    const statusCounts = await this.revisions
      .createQueryBuilder('r')
      .select("r.status", 'status')
      .addSelect('COUNT(1)', 'total')
      .groupBy('r.status')
      .getRawMany();
    const totalClients = await this.clients.count();
    return { lowStock, stockValue: Number(stockValue?.sum ?? 0), statusCounts, totalClients };
  }
}

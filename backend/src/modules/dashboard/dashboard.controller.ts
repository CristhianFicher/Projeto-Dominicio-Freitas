import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  getOverview() {
    return this.service.getOverview();
  }
}

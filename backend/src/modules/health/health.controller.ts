import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health-check')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get('health-check')
  @HealthCheck()
  healthCheck() {
    return this.health.check([]);
  }
}

import { Controller, Post, Query } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('allocation')
export class AllocationController {
  constructor(private service: AllocationService) {}
  @ApiOperation({
    summary: 'Calculate allocation for a given month',
    description:
      'Calculates the allocation of solar production to tenants for the specified month.',
    responses: {
      200: {
        description: 'Allocation calculation completed successfully.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @ApiQuery({
    name: 'month',
    required: true,
    description: 'Month for which to calculate allocation in YYYY-MM format',
    example: '2026-01',
  })
  @Post('monthly')
  calculate(@Query('month') month: string) {
    return this.service.calculate(month);
  }
}

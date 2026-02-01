import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}
  @ApiOperation({
    summary: 'Get monthly report',
    description: 'Retrieves the report for a specified month.',
    responses: {
      200: {
        description: 'Monthly report retrieved successfully.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @ApiQuery({
    name: 'month',
    required: true,
    description: 'Month for which to retrieve the report in YYYY-MM format',
    example: '2026-01',
  })
  @Get('monthly')
  monthlyReport(@Query('month') month: string) {
    return this.service.monthlyReport(month);
  }
}

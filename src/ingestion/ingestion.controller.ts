import { Body, Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { SolarIngestionDto } from './dto/solar.dto';
import { ConsumptionIngestionDto } from './dto/consumption.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ingestion')
export class IngestionController {
  constructor(private service: IngestionService) {}
  @ApiOperation({
    summary: 'Ingest solar production data',
    description:
      'Ingests solar production data for a specific timestamp. If data for the timestamp already exists, it will be updated.',
    responses: {
      201: {
        description:
          'Solar production data has been successfully ingested or updated.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @Post('solar')
  ingestSolar(@Body() dto: SolarIngestionDto) {
    return this.service.ingestSolar(dto);
  }

  @ApiOperation({
    summary: 'Ingest tenant consumption data',
    description:
      'Ingests tenant consumption data for a specific timestamp. If data for the timestamp and tenant already exists, it will be updated.',
    responses: {
      201: {
        description:
          'Tenant consumption data has been successfully ingested or updated.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @Post('consumption')
  ingestConsumption(@Body() dto: ConsumptionIngestionDto) {
    return this.service.ingestConsumption(dto);
  }
}

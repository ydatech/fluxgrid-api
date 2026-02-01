import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class ConsumptionIngestionDto {
  @ApiProperty({
    required: true,
    description: 'ID of the tenant associated with the consumption data',
  })
  @IsString()
  tenantId: string;

  @ApiProperty({
    required: true,
    description:
      'Timestamp of the consumption data point in ISO 8601 format. imestamp must be hourly (minute and second must be 00)',
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({
    required: true,
    description: 'Kilowatt-hour (kWh) value of the consumption data point',
  })
  @IsNumber()
  @Min(0)
  kwh: number;
}

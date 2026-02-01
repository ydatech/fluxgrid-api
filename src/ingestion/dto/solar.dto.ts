import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class SolarIngestionDto {
  @ApiProperty({
    required: true,
    description:
      'Timestamp of the solar data point in ISO 8601 format. Timestamp must be hourly (minute and second must be 00)',
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({
    required: true,
    description: 'Kilowatt-hour (kWh) value of the solar data point',
  })
  @IsNumber()
  @Min(0)
  kwh: number;
}

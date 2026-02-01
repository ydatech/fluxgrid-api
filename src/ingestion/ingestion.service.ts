import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SolarIngestionDto } from './dto/solar.dto';
import { ConsumptionIngestionDto } from './dto/consumption.dto';

@Injectable()
export class IngestionService {
  constructor(private prisma: PrismaService) {}

  async ingestSolar(dto: SolarIngestionDto) {
    this.ensureHourly(dto.timestamp);

    const timestamp = new Date(dto.timestamp);

    const existing = await this.prisma.solarProduction.findFirst({
      where: { timestamp },
    });

    if (existing) {
      return this.prisma.solarProduction.update({
        where: { id: existing.id },
        data: { kwh: dto.kwh },
      });
    }

    return this.prisma.solarProduction.create({
      data: {
        timestamp,
        kwh: dto.kwh,
      },
    });
  }

  async ingestConsumption(dto: ConsumptionIngestionDto) {
    this.ensureHourly(dto.timestamp);

    const timestamp = new Date(dto.timestamp);

    const existing = await this.prisma.tenantConsumption.findFirst({
      where: { timestamp, tenantId: dto.tenantId },
    });

    if (existing) {
      return this.prisma.tenantConsumption.update({
        where: { id: existing.id },
        data: { kwh: dto.kwh },
      });
    }

    return this.prisma.tenantConsumption.create({
      data: {
        tenantId: dto.tenantId,
        timestamp,
        kwh: dto.kwh,
      },
    });
  }

  private ensureHourly(timestamp: string) {
    const date = new Date(timestamp);

    if (
      date.getMinutes() !== 0 ||
      date.getSeconds() !== 0 ||
      date.getMilliseconds() !== 0
    ) {
      throw new BadRequestException(
        'Timestamp must be hourly (minute and second must be 00)',
      );
    }
  }
}

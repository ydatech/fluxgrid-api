import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async monthlyReport(month: string) {
    if (!month) {
      throw new BadRequestException(
        'Month query parameter is required in YYYY-MM format',
      );
    }

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(`${month}-31`);
    const totalProduction = await this.prisma.solarProduction.aggregate({
      _sum: {
        kwh: true,
      },
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalConsumption = await this.prisma.tenantConsumption.aggregate({
      _sum: {
        kwh: true,
      },
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const tenants = await this.prisma.tenant.findMany();

    return {
      month,
      totalProduction: totalProduction._sum.kwh ?? 0,
      totalConsumption: totalConsumption._sum.kwh ?? 0,
      tenantCount: tenants.length,
      tenants: tenants.map((t) => ({
        id: t.id,
        name: t.name,
        carryoverCredit: t.crarryoverCredit,
      })),
    };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AllocationService {
  constructor(private prisma: PrismaService) {}

  async calculate(month: string) {
    if (!month) {
      throw new BadRequestException(
        'Month query parameter is required in YYYY-MM format',
      );
    }

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(`${month}-31`);

    const totalSolar = await this.prisma.solarProduction.aggregate({
      _sum: { kwh: true },
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const tenants = await this.prisma.tenant.findMany();
    const results = [];
    for (const t of tenants) {
      const usage = await this.prisma.tenantConsumption.aggregate({
        _sum: { kwh: true },
        where: {
          tenantId: t.id,
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      const entitled = (totalSolar?._sum?.kwh ?? 0) * t.subscriptionShare;
      let net = entitled - (usage._sum.kwh ?? 0);

      if (t.tier === 'BASIC') {
        net *= 0.95; // 5% discount for BASIC tier
      }

      const carryover = Math.max(net, 0);

      await this.prisma.tenant.update({
        where: { id: t.id },
        data: { crarryoverCredit: carryover },
      });

      results.push({ tenantId: t.id, net, carryover });
    }

    return results;
  }
}

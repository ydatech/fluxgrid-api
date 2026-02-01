import { Test } from '@nestjs/testing';
import { AllocationService } from './allocation.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AllocationService', () => {
  let service: AllocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllocationService,
        {
          provide: PrismaService,
          useValue: {
            // Mock PrismaService methods as needed for testing
            solarProduction: {
              aggregate: jest.fn().mockResolvedValue({ _sum: { kwh: 1000 } }),
            },
            tenant: {
              findMany: jest
                .fn()
                .mockResolvedValue([
                  { id: 't1', subscriptionShare: 0.5, tier: 'BASIC' },
                ]),
              update: jest.fn(),
            },
            tenantConsumption: {
              aggregate: jest.fn().mockResolvedValue({ _sum: { kwh: 400 } }),
            },
          },
        },
      ],
    }).compile();
    service = module.get(AllocationService);
  });

  it('applies 5% discount for BASIC tier tenants', async () => {
    const results = await service.calculate('2026-01');

    // entitled = 1000 * 0.5 = 500
    // net before discount = 500 - 400 = 100
    // net after 5% discount = 100 * 0.95 = 95
    expect(results[0].net).toBeCloseTo(95);
  });
});

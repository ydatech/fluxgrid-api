import { Module } from '@nestjs/common';
import { TenantsModule } from './tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { AllocationModule } from './allocation/allocation.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    PrismaModule,
    TenantsModule,
    IngestionModule,
    AllocationModule,
    ReportsModule,
  ],
})
export class AppModule {}

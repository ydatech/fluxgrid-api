import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { TenantTier } from 'src/generated/prisma/enums';

export class CreateTenantDto {
  @ApiProperty({
    required: true,
    description: 'Name of the tenant',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    description: 'Subscription share of the tenant (0 to 1)',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  subscriptionShare: number;

  @ApiProperty({
    required: true,
    description: 'Tier of the tenant',
    enum: TenantTier,
  })
  @IsEnum(TenantTier)
  tier: TenantTier;
}

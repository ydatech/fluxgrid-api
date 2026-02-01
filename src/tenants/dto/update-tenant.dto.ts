/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TenantTier } from 'src/generated/prisma/enums';

export class UpdateTenantDto {
  @ApiProperty({
    required: false,
    description: 'Name of the tenant',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    description: 'Subscription share of the tenant (0 to 1)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  subscriptionShare: number;

  @ApiProperty({
    required: false,
    description: 'Tier of the tenant',
    enum: TenantTier,
  })
  @IsOptional()
  @IsEnum(TenantTier)
  tier: TenantTier;
}

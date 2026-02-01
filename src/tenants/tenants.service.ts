/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({ data: dto });
  }
  findAll() {
    return this.prisma.tenant.findMany();
  }
  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }
  async update(id: string, dto: UpdateTenantDto) {
    try {
      return await this.prisma.tenant.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async remove(id: string) {
    try {
      return await this.prisma.tenant.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

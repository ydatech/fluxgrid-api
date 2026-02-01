import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tenants')
export class TenantsController {
  constructor(private service: TenantsService) {}
  @ApiOperation({
    summary: 'Create a new tenant',
    description: 'Creates a new tenant with the provided details.',
    responses: {
      201: {
        description: 'The tenant has been successfully created.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.service.create(dto);
  }
  @ApiOperation({
    summary: 'Get all tenants',
    description: 'Retrieves a list of all tenants.',
    responses: {
      200: {
        description: 'A list of tenants.',
      },
    },
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: 'Get a tenant by ID',
    description: 'Retrieves a tenant by its unique ID.',
    responses: {
      200: {
        description: 'The tenant details.',
      },
      404: {
        description: 'Tenant not found.',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a tenant',
    description: 'Updates the details of an existing tenant.',
    responses: {
      200: {
        description: 'The tenant has been successfully updated.',
      },
      400: {
        description: 'Bad Request. The input data is invalid.',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a tenant',
    description: 'Deletes a tenant by its unique ID.',
    responses: {
      200: {
        description: 'The tenant has been successfully deleted.',
      },
      400: {
        description: 'Bad Request. Unable to delete the tenant.',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

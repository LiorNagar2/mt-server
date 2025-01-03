import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './tanent.schema';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantsService: TenantsService) {}

    @Post()
    async create(@Body() createTenantDto: CreateTenantDto) {
        try {
            return await this.tenantsService.create(createTenantDto);
        } catch (e) {
            throw new HttpException(e.response, e.statusCode);
        }
    }

    @Get()
    findAll() {
        return this.tenantsService.findAll();
    }

    @Get(':tenantId')
    @ApiCreatedResponse({ type: Tenant })
    async getTenant(@Param('tenantId') tenantId: string) {
        try {
            return await this.tenantsService.findById(tenantId);
        } catch (e) {
            throw new HttpException(e.response, e.statusCode);
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
        return this.tenantsService.update(+id, updateTenantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tenantsService.remove(+id);
    }
}

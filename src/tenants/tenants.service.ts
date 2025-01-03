import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantDocument } from './tanent.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import {
    decryptData,
    encryptData,
    generateEncryptionKey,
} from '../helpers/encryption.helper';
import config from '../config/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantsService {
    constructor(
        @InjectModel(Tenant.name) private tenantModel: Model<Tenant>,
        private userService: UsersService,
        private configService: ConfigService
    ) {}

    async create(createTenantDto: CreateTenantDto) {
        try {
            const { user, tenantId, companyName } = createTenantDto;
            const jwtSecret = await this.generateTenantSecret();
            // Create tenant
            const newTenant = await new this.tenantModel({
                tenantId,
                companyName,
                jwtSecret,
            });
            // Create user for tenant
            await this.userService.create({
                ...user,
                tenantId,
            });
            return await newTenant.save();
        } catch (err) {
            if (err.code === 11000) {
                const { tenantId } = createTenantDto;
                err.error = 'TenantExists';
                err.message = `Tenant '${tenantId}' already exists`;
            }
            console.log(err);
            throw new BadRequestException(err.message, err.error);
        }
    }

    findAll() {
        return this.tenantModel.find();
    }

    async findById(tenantId: string): Promise<Tenant> {
        const tenant = await this.tenantModel.findOne({ tenantId: tenantId });
        if (!tenant) {
            throw new NotFoundException(`TenantId '${tenantId}' not found`);
        }

        return tenant;
    }

    update(id: number, updateTenantDto: UpdateTenantDto) {
        return `This action updates a #${id} tenant`;
    }

    remove(id: number) {
        return `This action removes a #${id} tenant`;
    }

    findOne(id: string) {
        return this.tenantModel.findById(id);
    }

    async getTenantSecret(tenantId: string) {
        const tenant = await this.findById(tenantId);
        const encryptionKey = this.configService.get('security.encryptionKey');
        return decryptData(tenant.jwtSecret, encryptionKey);
    }

    async generateTenantSecret() {
        const encryptionKey = this.configService.get('security.encryptionKey');
        return encryptData(generateEncryptionKey(), encryptionKey);
    }
}

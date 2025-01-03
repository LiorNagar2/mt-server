import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
    constructor(private tenantsService: TenantsService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        let tenantId = req.headers['x-tenant-id'] || req.headers['X-TENANT-ID'];
        tenantId = tenantId?.toString();

        if (!tenantId) {
            throw new BadRequestException('X-Tenant-ID header not provided');
        }
        //console.log(tenantId);
        const tenant = await this.tenantsService.findById(tenantId);
        if (!tenant) {
            throw new BadRequestException(`X-Tenant-ID ${tenantId} not found`);
        }

        req['tenantId'] = tenantId;
        next();
    }
}

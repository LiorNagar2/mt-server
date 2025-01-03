import { CreateTenantDto } from './create-tenant.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateTenantDto extends PartialType(
    OmitType(CreateTenantDto, ['tenantId', 'user'])
) {}

import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema, Tenant } from './tanent.schema';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Tenant.name, schema: TenantSchema },
        ]),
        UsersModule,
    ],
    controllers: [TenantsController],
    providers: [TenantsService],
    exports: [TenantsService],
})
export class TenantsModule {}

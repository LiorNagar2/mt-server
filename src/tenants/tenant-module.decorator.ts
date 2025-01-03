import { MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { TenantsMiddleware } from '../middlewares/tenants.middleware';
import { TenantsModule } from './tenants.module';
import { AuthModule } from '../auth/auth.module';
import { TenantConnectionProvider } from '../providers/tenant-connection.provider';

export function TenantModule(config: {
    imports?: any[];
    controllers: Type<any>[];
    providers: any[];
    exports?: any[];
}) {
    @Module({
        imports: [TenantsModule, AuthModule, ...(config?.imports || [])],
        controllers: [...config.controllers],
        providers: [TenantConnectionProvider, ...config.providers],
        exports: [...(config?.exports || [])],
    })
    class DynamicTenantModule implements NestModule {
        configure(consumer: MiddlewareConsumer): any {
            consumer.apply(TenantsMiddleware).forRoutes(...config.controllers);
        }
    }

    return DynamicTenantModule;
}

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TenantModelsProvider } from '../providers/tenant-models.provider';
import { TenantModule } from '../tenants/tenant-module.decorator';
/*import { TenantModelsModule } from '../tenants/tenant-models/tenant-models.module';
import { ProductSchema } from './product.schema';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TenantsMiddleware } from '../middlewares/tenants.middleware';
import { TenantsModule } from '../tenants/tenants.module';*/

const DynamicTenantModule = TenantModule({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService, TenantModelsProvider.ProductModel],
});

export class ProductsModule extends DynamicTenantModule {}

/*@Module({
    imports: [
        AuthModule,
        TenantsModule,
        TenantModelsModule.forRoot([
            { name: 'Product', schema: ProductSchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(TenantsMiddleware).forRoutes(ProductsController)
    }
}*/

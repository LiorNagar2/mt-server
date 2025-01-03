import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TenantModelsProvider } from '../providers/tenant-models.provider';
import { TenantModule } from '../tenants/tenant-module.decorator';

const DynamicTenantModule = TenantModule({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService, TenantModelsProvider.ProductModel],
});

export class ProductsModule extends DynamicTenantModule {}

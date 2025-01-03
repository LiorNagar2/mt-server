import { Connection } from 'mongoose';
import { Product, ProductSchema } from '../products/product.schema';

export const TenantModelsProvider = {
    ProductModel: {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection: Connection) => {
            return connection.model(Product.name, ProductSchema);
        },
        inject: ['TENANT_CONNECTION'],
    },
};

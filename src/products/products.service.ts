import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCT_MODEL') private productModel: Model<ProductDocument>,
        private readonly logger: Logger
    ) {}

    create(createProductDto: CreateProductDto) {
        return this.productModel.create(createProductDto);
    }

    findAll() {
        return this.productModel.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}

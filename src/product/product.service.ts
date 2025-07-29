import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMQService } from 'src/rabbitmq/rabbbitmq.service';

@Injectable()
export class ProductService {
    constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly rabbitMQService: RabbitMQService
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async create(productData: Product): Promise<Product> {
        const newProduct = new this.productModel(productData);
        const savedProduct= newProduct.save();

        await this.rabbitMQService.sendProductCreatedEvent( savedProduct);
        return savedProduct
    }

    async findByTitle(title: string): Promise<Product | null> {
        if (!title) {
            return null;
        }
        return this.productModel.findOne({ title }).exec();
    }

    async delete(title: string): Promise<Product | null> {
        if (!title) {
            return null;
        }
        const deleteProduct= this.productModel.findOneAndDelete({ title }).exec();

        this.rabbitMQService.sendProductDeletedEvent(deleteProduct)
        return deleteProduct;
    }

    async update(title: string, productData: Product): Promise<Product | null> {
        if (!title) {
            return null;
        }
        const updateProduct= this.productModel.findOneAndUpdate(
            { title },
            productData,
            { new: true }
        ).exec();

        this.rabbitMQService.sendProductUpdatedEvent( updateProduct);
        return updateProduct;

    }

    

}

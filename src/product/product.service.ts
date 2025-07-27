import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async create(productData: Product): Promise<Product> {
        const newProduct = new this.productModel(productData);
        return newProduct.save();
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
        return this.productModel.findOneAndDelete({ title }).exec();
    }

    async update(title: string, productData: Product): Promise<Product | null> {
        if (!title) {
            return null;
        }
        return this.productModel.findOneAndUpdate(
            { title },
            productData,
            { new: true }
        ).exec();
    }

    

}

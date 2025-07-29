import { Controller, Get,Param,Post,Body, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return this.productService.findAll();
    }


    @Post()
    async createProduct(@Body() productData: Product) {
        return this.productService.create(productData);
    }

    @Get(':title')
    async getProduct(@Param('title') title: string) {
        return this.productService.findByTitle(title);
    }

    @Delete(':title')
    async deleteProduct(@Param('title') title: string) {
        return this.productService.delete(title);
    }

    @Patch(':title')
    async updateProduct(@Param('title') title: string, @Body() productData: Product) {
        return this.productService.update(title, productData);
    }
    
}


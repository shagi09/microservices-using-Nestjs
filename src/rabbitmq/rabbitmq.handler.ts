// src/rabbitmq/rabbitmq.handler.ts
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Product } from '../product/schemas/product.schema'

@Controller()
export class RabbitMQHandler {
    private readonly logger = new Logger(RabbitMQHandler.name);

    @EventPattern('product_created')
    async handleProductCreated(@Payload() product: Product) {
        this.logger.log(`New product created: ${product.title}`);
        // Implement your logic here
        // Example: update search index, cache, etc.
    }

    @EventPattern('product_updated')
    async handleProductUpdated(@Payload() product: Product) {
        this.logger.log(`Product updated: ${product.title}`);
        // Implement your logic here
    }

    @EventPattern('product_deleted')
    async handleProductDeleted(@Payload() data: { id: string, title: string }) {
        this.logger.log(`Product deleted: ${data.title}`);
        // Implement your logic here
    }
}
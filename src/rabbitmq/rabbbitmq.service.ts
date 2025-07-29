import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common/services/logger.service";


@Injectable()
export class RabbitMQService {
    private client: ClientProxy;
    private readonly logger = new Logger(RabbitMQService.name);

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'products_queue',
                queueOptions: {
                    durable: true // Make queue durable for persistence
                },
            },
        });
 
 
 
 
    }
    public async sendProductCreatedEvent(product: any) {
        try {
            await this.client.emit('product_created', product);
            this.logger.log(`Product created event sent: ${product.title}`);
        } catch (error) {
            this.logger.error('Error sending product_created event', error.stack);
        }
    }

    public async sendProductUpdatedEvent(product: any) {
        try {
            await this.client.emit('product_updated', product);
            this.logger.log(`Product updated event sent: ${product.title}`);
        } catch (error) {
            this.logger.error('Error sending product_updated event', error.stack);
        }
    }

    public async sendProductDeletedEvent(product: any) {
        try {
            await this.client.emit('product_deleted', {
                id: product._id,
                title: product.title
            });
            this.logger.log(`Product deleted event sent: ${product.title}`);
        } catch (error) {
            this.logger.error('Error sending product_deleted event', error.stack);
        }
    }



}
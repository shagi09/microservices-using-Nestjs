// src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbbitmq.service';

@Module({
    providers: [RabbitMQService],
    exports: [RabbitMQService]
})
export class RabbitMQModule {}
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // RabbitMQ Microservice setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // or your RabbitMQ server URL
      queue: 'products_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); // Admin service HTTP port
}
bootstrap();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
        ConfigModule.forRoot({  // Load .env file
      isGlobal: true,       // Make available globally
      envFilePath: '.env',  // Explicit path
    }),
    
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/microservices')],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

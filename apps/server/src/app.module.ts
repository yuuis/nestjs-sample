import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TrpcModule} from '@server/trpc/trpc.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [TrpcModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

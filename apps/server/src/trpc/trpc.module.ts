import { Module } from '@nestjs/common';
import {TrpcService} from '@server/trpc/trpc.service';
import {TrpcRouter} from '@server/trpc/trpc.router';
import {ProductsService} from '@server/modules/products/products.service';
import {ProductsModule} from '@server/modules/products/products.module';
import {ProductsRepository} from '@server/modules/products/products.repository';
import {PrismaModule} from '@server/database/prisma.module';

@Module({
  imports: [ProductsModule, PrismaModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter, ProductsService, ProductsRepository],
})
export class TrpcModule {}

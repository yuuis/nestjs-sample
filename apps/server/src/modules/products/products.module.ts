import {Module} from '@nestjs/common';
import {ProductsRepository} from './products.repository';
import {PrismaModule} from '@server/database/prisma.module';
import {ProductsService} from '@server/modules/products/products.service';
import {PrismaService} from '@server/database/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductsRepository, ProductsService, PrismaService],
})
export class ProductsModule {
}

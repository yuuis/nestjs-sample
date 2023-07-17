import {Injectable} from '@nestjs/common';
import {Product} from '@prisma/client';
import {PrismaService} from '@server/database/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {
  }

  async find(params: {
    skip?: number;
    take?: number;
    where?: { name?: string };
  }): Promise<Product[]> {
    const {skip, take, where} = params;
    return this.prisma.product.findMany({
      skip,
      take,
      where,
    });
  }
}

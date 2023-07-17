import {TrpcService} from '@server/trpc/trpc.service';
import {INestApplication, Injectable} from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import {ProductsService} from '@server/modules/products/products.service';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService, private readonly productsService: ProductsService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({input}) => {
        const {name} = input;
        return {
          greeting: `Hello ${name ?? 'World'}`,
        }
      }),
    getProducts: this.trpc.procedure
      .query(async () => {
        return {
          products: await this.productsService.find(),
        };
      }),
    // getUsers: this.trpc.procedure
    //   .input(
    //     z.object({
    //       name: z.string(),
    //     }),
    //   )
    //   .query(async ({ input }) => {
    //     const { name } = input;
    //     return await this.userService.getUsers(name); // random example showing you how you can now use dependency injection
    //   }),
    // you can merge routers: https://trpc.io/docs/server/merging-routers
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}


export type AppRouter = TrpcRouter['appRouter'];

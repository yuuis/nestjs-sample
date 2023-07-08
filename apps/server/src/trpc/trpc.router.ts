import {TrpcService} from '@server/trpc/trpc.service';
import {INestApplication, Injectable} from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

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

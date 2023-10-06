import { getAuth } from "@clerk/remix/ssr.server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { initTRPC } from "@trpc/server";
import { getUserById } from "~/services/clerk.server";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  try {
    const session = await getAuth({
      request: opts.req,
      context: {},
      params: {},
    });

    console.log("user id from session", session);
    return {
      resHeaders: opts.resHeaders,
      userId: session?.userId,
    }
  } catch (error) {
    debugger;
    const err = error as any as Response;
    console.log("session", 'error');
    console.error(await err.text());
  }

  return {
    resHeaders: opts.resHeaders
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  helloUser: publicProcedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query(async (opts) => {
      const { input } = opts;

      return `Hello ${input}!`;
    }),
  currentUser: publicProcedure
    .query(async (opts) => {
      const { ctx } = opts;

      const userId = ctx.userId

      if (!userId) return "Hello anonymous user!";

      const user = await getUserById(userId);

      return `Hello ${user.firstName}!`;
    }),
});

export type AppRouter = typeof appRouter;

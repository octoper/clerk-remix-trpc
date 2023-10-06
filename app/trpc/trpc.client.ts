import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './trpc.server';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from "~/trpc/trpc.server";

export const loader = async (args: LoaderFunctionArgs) => {
  return await handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
  return await handleRequest(args);
};

async function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return await fetchRequestHandler({
    endpoint: '/trpc',
    req: args.request,
    router: appRouter,
    createContext,
  });
}

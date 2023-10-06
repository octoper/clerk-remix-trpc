import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import style from "./styles/test.css";
import rdtStylesheet from "remix-development-tools/index.css";
import { withDevTools } from "remix-development-tools";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...(process.env.NODE_ENV === "development" ? [{ rel: "stylesheet", href: rdtStylesheet }] : []),
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const ErrorBoundary = ClerkErrorBoundary();

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default withDevTools(ClerkApp(App));

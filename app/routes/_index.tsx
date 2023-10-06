import { SignedIn, SignedOut } from "@clerk/remix";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Test from "~/components/test";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <SignedOut>
        Go to <Link to={"/sign-in"}>Sign In</Link>
      </SignedOut>
      <SignedIn>
        <Test />
      </SignedIn>
    </div>
  )
}

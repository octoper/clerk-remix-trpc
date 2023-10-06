import { SignIn } from "@clerk/remix";

export default function Index() {
  return (
    <SignIn path="/sign-in" routing="path" />
  );
}

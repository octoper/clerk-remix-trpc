import { createClerkClient } from "@clerk/remix/api.server";

const client = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
})

export const getUserById = async (id: string) => {
  return await client.users.getUser(id);
}

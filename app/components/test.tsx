import { UserButton } from "@clerk/remix";
import { TRPCClientError } from "@trpc/client";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { client } from "~/trpc/trpc.client";
import type { AppRouter } from "~/trpc/trpc.server";

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export default function Test() {
  const [name, setName] = useState("World");
  const [message, setMessage] = useState("Hello World!");

  const nameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const getCurrentUser = async () => {
    try {
      const resMessage = await client.currentUser.query();
      setMessage(resMessage);
    } catch (cause) {
      if (isTRPCClientError(cause)) {
        setMessage('Not logged in');
      }
    }
  }

  useEffect(() => {
    (async () => {
      await getCurrentUser();
    })();
  }, []);

  const submit = useCallback(async () => {
    try {
      const resMessage = await client.helloUser.query(name);
      setMessage(resMessage);
    } catch (cause) {
      if (isTRPCClientError(cause)) {
        setMessage('Not logged in');
      }
    }
  }, [name]);

  return (
    <div>
      <UserButton></UserButton>
      <p>{message}</p>
      <div>
        <input type="text" defaultValue={name} onChange={nameChange} />
        <button onClick={submit}>Text</button>
        <button onClick={getCurrentUser}>User</button>
      </div>
    </div>
  );
}

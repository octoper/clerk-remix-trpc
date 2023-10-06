import { UserButton } from "@clerk/remix";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { client } from "~/trpc/trpc.client";

export default function Test() {
  const [name, setName] = useState("World");
  const [message, setMessage] = useState("Hello World!");

  const nameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const resMessage = await client.currentUser.query();
      setMessage(resMessage);
    })();
  }, []);

  const submit = useCallback(async () => {
    const resMessage = await client.helloUser.query(name);
    setMessage(resMessage);
  }, [name]);

  const getCurrentUser = useCallback(async () => {
    const resMessage = await client.currentUser.query();
    setMessage(resMessage);
  }, []);

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

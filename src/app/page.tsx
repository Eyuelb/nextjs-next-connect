"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  const userId = Array.isArray(users) && users.length > 0 ? users[0].id : "";
  const handleGetAll = async () => {
    const response = await fetch("/api/users").then((res) => res.json());
    setUsers(response.users);
    alert("User has been Fetched successfully");
  };
  useEffect(() => {
    handleGetAll();
    return () => {};
  }, []);

  const handleCreate = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Jane Doe", age: 18 }),
    }).then((res) => res.json());
    alert(response.message);
    console.log(response);
  };
  const handleGetById = async (id: string) => {
    const response = await fetch(`/api/users/${id}`).then((res) => res.json());
    console.log(response);
    alert(JSON.stringify(response.user));
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <a href="https://github.com/hoangvvo/next-connect/tree/main/examples/nextjs-13/src/app/api">
          App Router
        </a>{" "}
        example
      </h1>
      <p>
        Open your devtool (<code>F12</code>) and try the following snippets.
      </p>
      <h2>
        <code className={styles.code}>POST /api/users</code>
        <span> - Create a user</span>
      </h2>
      <div className={styles.snippet}>
        <pre>{`await fetch("/api/users", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "Jane Doe", age: 18 }),
}).then((res) => res.json());
`}</pre>
        <button
          className="border p-2 rounded-md bg-emerald-300"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
      <h2>
        <code className={styles.code}>GET /api/users</code>
        <span> - Get all users</span>
      </h2>
      <div className={styles.snippet}>
        <pre>{`await fetch("/api/users").then((res) => res.json());
`}</pre>
        <button
          className="border p-2 rounded-md bg-emerald-300"
          onClick={handleGetAll}
        >
          Get All
        </button>
      </div>
      <h2>
        <code className={styles.code}>GET /api/users/:id</code>
        <span> - Get a single user</span>
      </h2>
      <div className={styles.snippet}>
        <pre>
          {`await fetch("/api/users/`}
          <span className={styles.code}>some-id</span>
          {`").then(res => res.json());
`}
        </pre>
        {userId !== "" && (
          <button
            className="border p-2 rounded-md bg-emerald-300"
            onClick={() => handleGetById(userId)}
          >
            Get By Id
          </button>
        )}
      </div>
    </main>
  );
}

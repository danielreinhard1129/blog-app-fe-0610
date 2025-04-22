"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  return (
    <div>
      <h1>Homepage</h1>
      {user ? <p>{user.name}</p> : <p>Please login first!</p>}
      
      {user ? (
        <Button onClick={clearAuth}>Logout</Button>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}

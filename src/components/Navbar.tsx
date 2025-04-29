"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="bg-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/">Logo</Link>

          <div className="flex cursor-pointer items-center gap-4">
            <Link href="/">Home</Link>
            {!!session.data?.user && <Link href="/write">Write</Link>}
            {!session.data?.user && <Link href="/login">Sign in</Link>}
            {!!session.data?.user && <p onClick={logout}>Logout</p>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

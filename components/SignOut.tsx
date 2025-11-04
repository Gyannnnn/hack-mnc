"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return <form onClick={handleSignOut}>Sign Out</form>;
}

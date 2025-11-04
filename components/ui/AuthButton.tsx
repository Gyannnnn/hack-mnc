import { auth } from "@/auth";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { SignOut } from "../SignOut";
import { LuLogOut } from "react-icons/lu";
import { FiLogIn } from "react-icons/fi";


export default async function AuthButton() {
  const session = await auth();
  if (!session?.user)
    return (
      <Link href="/login" className="w-full">
        <Button className="w-full"> <span><FiLogIn/></span> Sign in</Button>
      </Link>
    );
  return (
    <Button className="w-full">
      <SignOut />{" "}
      <span>
        <LuLogOut />
      </span>
    </Button>
  );
}

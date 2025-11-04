import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOut } from "./SignOut";
import { PiSignIn } from "react-icons/pi";

export default async function AvatarProfile() {
  const session = await auth();

  return (
    <div className="max-sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="max-sm:hidden">
            <AvatarImage
              src={session?.user?.image as string}
              alt={`${session?.user?.name}'s profile`}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-2 cursor-pointer"
            >
              <CgProfile className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <div className="flex w-full items-center gap-2 px-2 py-1.5">
              {session?.user ? (
                <>
                  <FiLogOut className="h-4 w-4" />
                  <SignOut />
                </>
              ) : (
                <div className="flex  gap-2">
                  {" "}
                  <span>
                    <PiSignIn />
                  </span>{" "}
                  <Link href="/login">Signin</Link>
                </div>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

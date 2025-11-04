"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

export default function ContinueWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Redirecting to Google...");

    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google sign in failed");
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      className="flex gap-2 justify-center items-center w-full"
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      variant="outline"
    >
      <FaGoogle /> Sign in with Google
      <Toaster />
    </Button>
  );
}

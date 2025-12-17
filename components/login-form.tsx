"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import from next-auth/react, not your auth file
import { FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    
    
    const toastId = toast.loading("Signing in...");
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

   

      toast.remove(toastId);

      if (result?.error) {
        toast.error("Sign in failed: " + result.error);
      } else {
        toast.success("Sign in successful!");
       
        router.push("/");
        router.refresh(); // Refresh the server components
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.remove(toastId);
      toast.error("Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
  setIsLoading(true);
  const toastId = toast.loading("Redirecting to Google...");

  try {
    // ✅ Redirect-based flow is required for OAuth
    await signIn("google", { callbackUrl: "/profile" });

    // This line WON’T execute since signIn will redirect the page
  } catch (error) {
    console.error("Google sign in error:", error);
    toast.error("Google sign in failed");
  } finally {
    setIsLoading(false);
    toast.dismiss(toastId);
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleCredentialsSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Hack MNC account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="w-full flex items-center justify-center">
                <Button
                  className="flex gap-2 justify-center items-center w-full"
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  variant="outline"
                >
                  <FaGoogle /> Sign in with Google
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
        <Toaster/>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
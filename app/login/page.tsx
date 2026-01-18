import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="cnt flex  w-screen flex-col items-center justify-center p-6 md:p-2">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}

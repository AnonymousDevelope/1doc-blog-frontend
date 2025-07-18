import { handleLogin } from "./action";
import LoginForm from "./_components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Admin Login</h1>
        <LoginForm locale="ru" action={handleLogin} />
      </div>
    </div>
  );
}
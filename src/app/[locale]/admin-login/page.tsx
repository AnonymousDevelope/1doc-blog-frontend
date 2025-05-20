"use server"
// app/[locale]/(dashboard)/admin-login/page.tsx
import { cookies } from "next/headers";
import { z } from "zod";
import LoginForm from "./_components/LoginForm";
import { login } from "@/api/services/authService";
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(3, { message: "Password must be at least 3 characters." }),
});
interface PageProps {
  params: {
    locale: string;
  };
}
// ✅ Server Action outside of component
export async function handleLogin(formData: FormData) {
  const cookieStore = await cookies();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const validatedData = formSchema.parse(data);
    const response = await login(validatedData.email, validatedData.password);
    cookieStore.set("token", response.token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return {
      success: true,
      message: `Welcome, ${response.user.name}`,
      redirect: "/dashboard",
    };
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.errors.map((e) => e.message).join(", ")
        : error instanceof Error
        ? error.message
        : "Something went wrong.";
    return {
      success: false,
      message,
    };
  }
}
export default async function AdminLoginPage({ params }: PageProps) {
  const locale = params.locale;
  console.log(locale);
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Admin Login</h1>
        {/* ✅ handleLogin is passed to the form via action */}
        <LoginForm locale={locale} action={handleLogin} />
      </div>
    </div>
  );
}

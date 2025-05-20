"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  locale: string;
  action: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
    redirect?: string;
  }>;
}

export default function LoginForm({ locale, action }: LoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await action(formData);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      if (result.redirect) {
        router.push(result.redirect);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          defaultValue={process.env.NEXT_PUBLIC_DEV_EMAIL || ""}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            required
            className="mt-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
      <div className="text-center">
        <a
          href={`/${locale}/forgot-password`}
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Login"}
      </Button>
    </form>
  );
}
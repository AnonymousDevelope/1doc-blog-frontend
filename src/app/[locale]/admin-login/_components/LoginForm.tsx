"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRef, useTransition } from "react";
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

  // Refs o'rniga ishlatilmoqda
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const showPasswordRef = useRef(false);

  const togglePasswordVisibility = () => {
    showPasswordRef.current = !showPasswordRef.current;
    // Trick: forcing rerender by modifying a class or triggering a dummy state can be added if needed.
    const input = passwordRef.current;
    if (input) {
      input.type = showPasswordRef.current ? "text" : "password";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      const formData = new FormData();
      if (emailRef.current && passwordRef.current) {
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
      }

      action(formData).then((result) => {
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          });
          if (result.redirect) {
            router.push(result.redirect);
            router.refresh();
          }
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message,
          });
        }
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again.",
        });
        console.error("Login error:", error);
      });
    });
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
          defaultValue={process.env.NEXT_PUBLIC_DEV_EMAIL}
          ref={emailRef}
          required
          className="mt-1"
          autoComplete="username"
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
            type="password"
            placeholder="Your password"
            ref={passwordRef}
            required
            className="mt-1"
            autoComplete="current-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
            aria-label={showPasswordRef.current ? "Hide password" : "Show password"}
          >
            {showPasswordRef.current ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      <div className="text-center">
        <a
          href={`/${locale}/forgot-password`}
          className="text-sm text-blue-500 hover:underline"
          aria-label="Forgot password"
        >
          Forgot your password?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
        aria-label={isPending ? "Submitting login" : "Login"}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// 🔹 Skema validasi Zod
const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password require more than 6 character"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const sesion = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn.email({
        email: data.email,

        password: data.password,
      });
      console.log(data);
      if (result.error) {
        setError(result.error?.message || "something went wrong");
        console.log(result.error.message);
      } else {
        router.push("/");
      }
    } catch (e) {
      setError("something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = signIn.social({
        provider: "google",
      });
    } catch (error) {
      setError("Cannot log in with google account");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-5 md:mx-0">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login To LinkZ
          </CardTitle>

          <Image
            src="/images/logo-transparent.png"
            alt="LinkZ"
            width={200}
            height={200}
            className="mx-auto mix-blend-multiply"
          />

          <div className="mx-auto">
            {error && <h1 className="text-red-500">{error}</h1>}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={cn(
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={cn(
                  errors.password && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
              or
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Don't have an account?
          <a href="/register" className="text-blue-600 hover:underline ml-1">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
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
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import prisma from "@/lib/prisma";

// 🔹 Skema validasi Zod
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores allowed"
      ),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password require more than 6 character"),
    confirmPassword: z
      .string()
      .min(6, "Password require more than 6 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

async function checkUsername(username: string) {
  const res = await fetch("/api/check-username", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  const data = await res.json();
  return data.exists;
}

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(undefined);

    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        username: data.username,
      });

      console.log(result);

      if (result.error) {
        setError(result.error?.message || "Something went wrong");
      } else {
        setSuccess(true);
        // Redirect ke login setelah berhasil register
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
      });
    } catch (error) {
      setError("Cannot sign up with Google account");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-5 md:mx-0">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create Your LinkZ Account
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
            {success && (
              <h1 className="text-green-500">
                Registration successful! Redirecting to login...
              </h1>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                {...register("name")}
                className={cn(
                  errors.name && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="you_123"
                {...register("username")}
                className={cn(
                  errors.username && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>

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

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={cn(
                  errors.confirmPassword &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
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
            onClick={handleGoogleSignUp}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

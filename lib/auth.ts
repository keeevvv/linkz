import LinkzResetPasswordEmail from "@/components/ForgotPasswordEmailTemplate";
import { PrismaClient } from "@/generated/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

// If your Prisma file is located elsewhere, you can change the path

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  plugins: [nextCookies(), username()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    resetPasswordTokenExpiresIn: 3600,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        react: LinkzResetPasswordEmail({
          email: user.email,
          resetPasswordLink: url,
          updatedDate: new Date(Date.now()),
        }),
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: async (profile) => {
        const baseUsername = profile.email
          .split("@")[0]
          .replace(/[^a-zA-Z0-9_]/g, "") // hapus karakter aneh
          .toLowerCase();

        let username = baseUsername;
        let counter = 1;

        // 🔁 Loop hingga username unik ditemukan
        while (true) {
          const existing = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
          });

          if (!existing) break; // username belum ada → lanjut pakai
          username = `${baseUsername}${counter++}`; // tambahkan angka di belakang
        }

        return {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          username, // sudah unik!
          displayUsername: username,
        };
      },
    },
  },
});

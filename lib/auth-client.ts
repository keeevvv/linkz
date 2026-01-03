import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
export const {
  signIn,
  signUp,
  useSession,
  signOut,
  requestPasswordReset,
  resetPassword,
} = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient()],
  user: {
    fields: {
      username: true,
    },
  },
});

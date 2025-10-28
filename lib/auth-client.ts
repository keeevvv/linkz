import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [usernameClient()],
  user: {
    fields: {
      username: true,
    },
  },
});

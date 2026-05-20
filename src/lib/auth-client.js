import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Use environment variable for backend URL – works locally and on Vercel
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth`,
  plugins: [
    jwtClient(),
  ],
});

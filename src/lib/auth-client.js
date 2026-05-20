import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Must match the backend base URL exactly
  baseURL: "http://localhost:5000/api/auth",
  plugins: [
    jwtClient(),
  ],
});

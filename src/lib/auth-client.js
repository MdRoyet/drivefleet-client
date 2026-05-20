import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Must match the backend base URL exactly
  baseURL: "http://localhost:5000/api/auth",
});

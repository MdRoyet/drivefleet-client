import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"; // ⚡ Import the JWT Plugin

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  plugins: [
    // ⚡ This activates asymmetric signing and generates the /api/auth/jwks endpoint!
    jwt({
      jwks: {
        keyRotationInterval: 7 * 24 * 60 * 60, // Auto-rotates your security keys weekly
      },
    }),
  ],
});

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordError("");
  };

  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password length must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must have an Uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must have a Lowercase letter.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errorMsg = validatePassword(formData.password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsPending(true);

    // BetterAuth Email Sign Up
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.photoUrl, // Sending photoUrl seamlessly to BetterAuth profile
    });

    setIsPending(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Registration successful! Please login.");
    router.push("/login"); // Redirect to Login page on success
  };

  const handleGoogleLogin = async () => {
    setIsPending(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });

    setIsPending(false);

    if (error) {
      toast.error(error.message || "Google Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-12 relative z-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
        {/* LEFT SIDE: Big Cars Picture */}
        <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
            alt="Big Premium Car"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white z-10 hidden sm:block">
            <h3 className="text-3xl font-black mb-2">Drive Fleet</h3>
            <p className="text-white/80 font-medium">
              Join the premium journey.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div
          className="w-full lg:w-1/2 relative p-8 sm:p-12 flex flex-col justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0"></div>

          <div className="relative z-10 text-white">
            <h2 className="text-4xl font-black text-center mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Create Account
            </h2>
            <p className="text-center text-white/70 mb-8 font-medium">
              Join DriveFleet and start your journey today.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="form-control w-full">
                <label className="label py-0.5">
                  <span className="label-text font-bold text-white/90 uppercase tracking-wider text-xs">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full bg-white/10 text-white focus:bg-white/20 border-white/20 focus:border-primary placeholder:text-white/40 transition-all h-11"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-0.5">
                  <span className="label-text font-bold text-white/90 uppercase tracking-wider text-xs">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full bg-white/10 text-white focus:bg-white/20 border-white/20 focus:border-primary placeholder:text-white/40 transition-all h-11"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-0.5">
                  <span className="label-text font-bold text-white/90 uppercase tracking-wider text-xs">
                    Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="Paste profile image link"
                  className="input input-bordered w-full bg-white/10 text-white focus:bg-white/20 border-white/20 focus:border-primary placeholder:text-white/40 transition-all h-11"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-0.5">
                  <span className="label-text font-bold text-white/90 uppercase tracking-wider text-xs">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`input input-bordered w-full bg-white/10 text-white focus:bg-white/20 placeholder:text-white/40 transition-all h-11 ${passwordError ? "border-error ring-1 ring-error focus:border-error" : "border-white/20 focus:border-primary"}`}
                  required
                  disabled={isPending}
                />

                {passwordError ? (
                  <label className="label py-1">
                    <span className="label-text-alt text-error font-semibold flex items-center gap-1 bg-error/10 px-2 py-1 rounded w-full border border-error/20">
                      ⚠️ {passwordError}
                    </span>
                  </label>
                ) : (
                  <label className="label py-1">
                    <span className="label-text-alt text-white/50 text-[11px]">
                      Must be at least 6 characters, with an uppercase &
                      lowercase letter.
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                className="btn border-none bg-primary hover:bg-primary-focus w-full mt-2 text-white text-lg shadow-[0_0_20px_rgba(var(--tw-colors-primary),0.5)] hover:scale-[1.02] transition-transform rounded-xl h-11"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="divider before:bg-white/20 after:bg-white/20 text-white/50 my-6 text-sm font-bold uppercase tracking-widest">
              Or
            </div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full text-white hover:bg-white/20 hover:border-white border-white/30 flex items-center justify-center gap-3 transition-all rounded-xl shadow-lg h-11"
              disabled={isPending}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm mt-6 text-white/80">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:text-white hover:underline transition-all"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function LoginPage() {
  return (
    /* FULL PAGE BACKGROUND WRAPPER SPECIFIC TO THIS PAGE */
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Glass Overlay to ensure the form is readable */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Floating Glassmorphism Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 rounded-[2rem] p-8 sm:p-12 text-white">
        {/* Clear Login Title */}
        <h2 className="text-3xl font-black text-center mb-2 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-white/70 mb-8 font-medium">
          Login to access your DriveFleet account.
        </p>

        {/* Login Form */}
        <form className="space-y-5">
          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-white/90">
                Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/10 text-white focus:bg-white/20 border-white/20 placeholder:text-white/40 transition-colors"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-white/90">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/10 text-white focus:bg-white/20 border-white/20 placeholder:text-white/40 transition-colors"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn border-none bg-primary hover:bg-primary-focus w-full mt-4 text-white shadow-[0_0_15px_rgba(var(--tw-colors-primary),0.4)] hover:scale-[1.02] transition-transform rounded-xl"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider before:bg-white/20 after:bg-white/20 text-white/50 my-8 text-sm font-semibold tracking-widest">
          OR
        </div>

        {/* Google Login Button */}
        <button className="btn btn-outline w-full text-white hover:bg-white/20 hover:border-white border-white/30 flex items-center justify-center gap-3 transition-colors rounded-xl backdrop-blur-sm">
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

        {/* Link to Register Page */}
        <p className="text-center text-sm mt-8 text-white/80">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:text-white hover:underline transition-all"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

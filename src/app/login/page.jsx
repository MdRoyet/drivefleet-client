import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 py-10 relative z-10">
      {/* Glassmorphism Card Wrapper */}
      <div className="card w-full max-w-md bg-base-100/70 backdrop-blur-xl shadow-2xl border border-base-content/10">
        <div className="card-body px-8 py-10">
          {/* Clear Login Title */}
          <h2 className="text-3xl font-black text-center text-base-content mb-1">
            Welcome Back
          </h2>
          <p className="text-center text-base-content/70 mb-8 font-medium">
            Login to access your DriveFleet account.
          </p>

          {/* Login Form */}
          <form className="space-y-5">
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-base-content/90">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-200 transition-colors placeholder:text-base-content/40"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-base-content/90">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-200 transition-colors placeholder:text-base-content/40"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 text-white shadow-[0_0_15px_rgba(var(--tw-colors-primary),0.3)] hover:scale-[1.02] transition-transform"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-base-content/50 my-6 text-sm font-semibold">
            OR
          </div>

          {/* Google Login Button */}
          <button className="btn btn-outline w-full hover:bg-base-200 hover:text-base-content flex items-center justify-center gap-3 transition-colors border-base-content/20">
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
          <p className="text-center text-sm mt-8 text-base-content/80">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

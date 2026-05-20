"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Successfully logged out!");
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className="font-medium hover:text-primary">
          Home
        </Link>
      </li>
      <li>
        <Link href="/explore-cars" className="font-medium hover:text-primary">
          Explore Cars
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <Link href="/add-car" className="font-medium hover:text-primary">
              Add Car
            </Link>
          </li>
          <li>
            <Link
              href="/my-bookings"
              className="font-medium hover:text-primary"
            >
              My Bookings
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sm:px-8 border-b border-base-200 sticky top-0 z-50">
      {/* Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {!isPending && !isLoggedIn && (
              <>
                <div className="divider my-1"></div>
                <li>
                  <Link href="/login" className="text-primary font-medium">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-primary font-medium">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-2xl font-bold text-primary gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          DriveFleet
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>

      {/* User Profile OR Login/Register */}
      <div className="navbar-end">
        {isPending ? (
          <div className="flex items-center justify-center w-10 h-10">
            <span className="loading loading-spinner loading-md text-primary animate-pulse"></span>
          </div>
        ) : isLoggedIn ? (
          <div className="dropdown dropdown-end">
            {/* ⚠️ VISUAL UPGRADE: Bordered Name & Avatar Capsule Trigger */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost border border-primary/40 hover:border-primary hover:bg-primary/5 rounded-full flex items-center gap-3 pl-4 pr-1.5 py-1 h-12 min-h-0 shadow-sm transition-all duration-200 normal-case"
            >
              {/* Displaying name directly besides profile picture */}
              <span className="font-bold text-sm max-w-[90px] sm:max-w-[140px] truncate text-base-content/90">
                {user?.name}
              </span>

              <div className="avatar">
                <div className="w-9 h-9 rounded-full ring-1 ring-primary/30">
                  <img
                    alt={user?.name || "User Profile"}
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`
                    }
                  />
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-[100] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-200 backdrop-blur-md bg-opacity-95"
            >
              <li className="px-4 py-2 border-b border-base-200 my-1 pointer-events-none">
                <p className="font-bold text-base-content text-sm truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-base-content/60 truncate font-medium">
                  {user?.email}
                </p>
              </li>
              <li>
                <Link
                  href="/add-car"
                  className="py-2.5 font-medium hover:text-primary transition-all"
                >
                  Add Car
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="py-2.5 font-medium hover:text-primary transition-all"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/my-added-cars"
                  className="py-2.5 font-medium hover:text-primary transition-all"
                >
                  My Added Cars
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="text-error font-semibold py-2.5 hover:bg-error/10 transition-all cursor-pointer block"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              href="/login"
              className="btn btn-primary rounded-md px-4 sm:px-6 text-white shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 font-bold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-outline btn-primary rounded-md px-4 sm:px-6 hidden sm:flex hover:scale-[1.02] active:scale-95 transition-all duration-200 font-bold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

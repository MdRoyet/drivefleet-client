"use client";
import Link from "next/link";

const Navbar = () => {
  // TODO: Replace with actual auth state later
  const user = true;

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
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8 sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
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

      {/* User Profile / Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-primary-focus transition-all"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li className="menu-title text-primary">My Account</li>
              <li>
                <Link href="/add-car">Add Car</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link href="/my-added-cars">My Added Cars</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button className="text-error font-semibold">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="btn btn-primary rounded-full px-8 shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

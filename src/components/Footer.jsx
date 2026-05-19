import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary font-bold text-3xl"
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
            <p className="text-sm opacity-75 leading-relaxed">
              Your premium destination for renting top-tier vehicles. Experience
              comfort, reliability, and style on every journey.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg tracking-wide uppercase text-base-content/90">
              Useful Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="link link-hover text-sm opacity-80 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/explore-cars"
                className="link link-hover text-sm opacity-80 hover:text-primary transition-colors"
              >
                Explore Cars
              </Link>
              <Link
                href="/login"
                className="link link-hover text-sm opacity-80 hover:text-primary transition-colors"
              >
                Login / Register
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg tracking-wide uppercase text-base-content/90">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4 text-sm opacity-80">
              <p className="flex items-center gap-3">
                <span className="text-primary text-xl">📍</span>
                123 Rental Avenue, Auto City
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-xl">📞</span>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-xl">✉️</span>
                support@drivefleet.com
              </p>
            </div>
          </div>

          {/* Newsletter (Extra UI Polish) */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg tracking-wide uppercase text-base-content/90">
              Stay Updated
            </h3>
            <p className="text-sm opacity-75">
              Subscribe to get special offers and new vehicle updates directly
              to your inbox.
            </p>
            <div className="join w-full mt-2 shadow-sm">
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered input-primary focus:outline-none join-item w-full"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Socials */}
      <div className="bg-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-75 text-center sm:text-left">
            © {new Date().getFullYear()} DriveFleet Ltd. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#"
              className="btn btn-circle btn-sm btn-outline btn-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="btn btn-circle btn-sm btn-outline btn-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            {/* Required X Logo */}
            <a
              href="#"
              className="btn btn-circle btn-sm btn-outline btn-primary hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

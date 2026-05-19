import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="footer max-w-7xl mx-auto p-10">
        {/* Brand & Contact Info */}
        <aside className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <span className="text-3xl font-bold text-white">DriveFleet</span>
          </div>
          <p className="max-w-xs text-neutral-content/80 mt-2">
            Premium car rental services providing reliable and comfortable
            vehicles for your journeys.
          </p>
          <div className="mt-4 space-y-1">
            <p className="flex items-center gap-2 text-sm">
              <span className="text-lg">📍</span> 123 Rental Avenue, Auto City
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="text-lg">📞</span> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="text-lg">✉️</span> support@drivefleet.com
            </p>
          </div>
        </aside>

        {/* Useful Links */}
        <nav>
          <header className="footer-title opacity-100 text-white border-b border-neutral-content/30 pb-2 mb-2 w-full">
            Useful Links
          </header>
          <Link
            href="/"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/explore-cars"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            Explore Cars
          </Link>
          <Link
            href="/login"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            Login / Register
          </Link>
          <a className="link link-hover text-neutral-content/80 hover:text-white">
            Terms & Conditions
          </a>
          <a className="link link-hover text-neutral-content/80 hover:text-white">
            Privacy Policy
          </a>
        </nav>

        {/* Social Links */}
        <nav>
          <header className="footer-title opacity-100 text-white border-b border-neutral-content/30 pb-2 mb-2 w-full">
            Follow Us
          </header>
          <div className="grid grid-flow-col gap-4 mt-2">
            {/* Facebook */}
            <a className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20 text-neutral-content/80 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            {/* YouTube */}
            <a className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20 text-neutral-content/80 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            {/* X Logo (New Twitter) */}
            <a className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20 text-neutral-content/80 hover:text-white transition-colors">
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Copyright */}
      <div className="footer footer-center p-4 bg-neutral-focus text-neutral-content/60 border-t border-neutral-content/10">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            DriveFleet Ltd.
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

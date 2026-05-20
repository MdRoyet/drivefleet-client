import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "DriveFleet - Car Rental Platform",
  description: "Explore, book, and manage your car rentals with ease.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Changed bg-gray-50 to bg-base-100 text-base-content */}
      <body className="flex flex-col min-h-screen bg-base-100 text-base-content">
        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

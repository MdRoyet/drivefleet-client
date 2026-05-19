import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css"; // Ensure your Tailwind styles are imported

export const metadata = {
  title: "DriveFleet - Car Rental Platform",
  description: "Explore, book, and manage your car rentals with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

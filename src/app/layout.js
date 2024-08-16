import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "ShopKaro",
  description: "Easy & comfort shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

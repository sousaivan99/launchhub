import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@module/header";
import Footer from "@module/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LaunchHUB",
  description: "LaunchHUB shows upcoming launches from SpaceX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}

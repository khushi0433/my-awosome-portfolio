import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundaryWrapper from "components/ErrorBoundary";
import Navbar from "components/navbar";
import Footer from "components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Khushi Hassan - Portfolio",
  description: "Full-stack developer portfolio showcasing my projects and skills",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />
        <ErrorBoundaryWrapper>
          <main className="relative flex-grow">{children}</main>
        </ErrorBoundaryWrapper>
        <Footer />
      </body>
    </html>
  );
}

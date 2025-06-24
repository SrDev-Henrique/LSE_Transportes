import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "LSE Transportes",
  description:
    "Especializada em transporte de refrigerados, congelados, perecíveis e climatizados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}

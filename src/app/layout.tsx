import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

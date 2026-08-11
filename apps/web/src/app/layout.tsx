import "@fontsource/inter";
import "@fontsource/space-grotesk/700.css";

import "./globals.css";

export const metadata = {
  title: "PublicScope",
  description: "Understand the story behind the story.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
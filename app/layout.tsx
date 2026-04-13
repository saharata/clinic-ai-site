import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลินิกเวชกรรมเด็กและระบบประสาท",
  description:
    "ดูแลโดยแพทย์ พร้อมระบบติดตามอาการต่อเนื่องผ่าน LINE และ AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
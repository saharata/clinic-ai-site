import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsEvents from "./AnalyticsEvents";

const siteUrl = "https://www.sahawanclinic.clinic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "คลินิกเวชกรรมเด็กและระบบประสาท | สหวรรณคลินิก นนทบุรี",
    template: "%s | สหวรรณคลินิก",
  },
  description:
    "คลินิกเวชกรรมเด็กและระบบประสาท ดูแลโดยกุมารแพทย์และประสาทแพทย์ " +
    "รับปรึกษาอาการปวดศีรษะ ไมเกรน เวียนศีรษะ ชัก อ่อนแรง และดูแลสุขภาพเด็ก " +
    "พร้อมระบบติดตามอาการต่อเนื่องผ่าน LINE นัดหมายโทร 065-480-8771",
  keywords: [
    "คลินิกประสาท",
    "ประสาทแพทย์ นนทบุรี",
    "คลินิกเด็ก นนทบุรี",
    "กุมารแพทย์",
    "ปวดศีรษะ ไมเกรน",
    "เวียนศีรษะ",
    "โรคลมชัก",
    "สหวรรณคลินิก",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    siteName: "สหวรรณคลินิก",
    title: "คลินิกเวชกรรมเด็กและระบบประสาท | สหวรรณคลินิก",
    description:
      "ดูแลโดยกุมารแพทย์และประสาทแพทย์ พร้อมระบบติดตามอาการต่อเนื่องผ่าน LINE นัดหมายโทร 065-480-8771",
    images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: "สหวรรณคลินิก" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

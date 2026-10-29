import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsEvents from "./AnalyticsEvents";
import TextSize from "./TextSize";
import { textSizeKey } from "./textSizeKey";

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
  // canonical ประกาศในแต่ละหน้าเอง — ถ้าใส่ที่นี่ ทุกหน้าที่ไม่ได้ประกาศจะสืบทอด canonical ของหน้าแรก
  // และ Google จะมองว่าเป็นหน้าซ้ำของหน้าแรก (เคยเกิดกับ /ai)
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
  // ยืนยันความเป็นเจ้าของเว็บกับ Google Search Console / Bing Webmaster Tools
  // ใส่รหัสใน Vercel → Settings → Environment Variables แล้ว redeploy (ไม่ใส่ = ไม่มี meta tag)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: สคริปต์ด้านล่างใส่ data-text-size ที่ <html> ก่อน React โหลด
    <html lang="th" suppressHydrationWarning>
      <body>
        {/* ใช้ขนาดตัวอักษรที่ผู้ใช้เคยเลือก ก่อนหน้าแสดงผล (กันหน้ากระตุกเปลี่ยนขนาด) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem(${JSON.stringify(textSizeKey)});if(s==="lg"||s==="xl")document.documentElement.dataset.textSize=s}catch(e){}`,
          }}
        />
        {/* a11y (keyboard): ลิงก์ข้ามเมนู — ปุ่มแรกที่ Tab ถึง */}
        <a href="#main-content" className="skip-link">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <TextSize />
        {children}
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

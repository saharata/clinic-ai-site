import type { Metadata } from "next";

// หน้านี้เป็น client component จึงประกาศ metadata ไว้ที่ layout ของ segment
// canonical ของหน้าตัวเอง (ถ้าไม่มี จะสืบทอดจาก segment แม่ ทำให้ Google เห็นเป็นหน้าซ้ำ)
export const metadata: Metadata = {
  title: "ลงทะเบียนใช้งาน AI Tools",
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai/register" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

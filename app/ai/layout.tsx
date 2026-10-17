import type { Metadata } from "next";

// หน้านี้เป็น client component จึงประกาศ metadata ไว้ที่ layout ของ segment
// canonical ของหน้าตัวเอง (ถ้าไม่มี จะสืบทอดจาก segment แม่ ทำให้ Google เห็นเป็นหน้าซ้ำ)
export const metadata: Metadata = {
  title: "เครื่องมือ AI สำหรับประสาทแพทย์",
  description:
    "ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน โดย นพ. สหรัฐ อังศุมาศ",
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
